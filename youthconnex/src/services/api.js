import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { auth, db, isFirebaseSupported } from '../config/firebase';

// ============= Mock Database Helpers (Local Storage) =============

const MOCK_USERS_KEY = 'yc_mock_users';
const MOCK_ITEMS_KEY = 'yc_mock_items';

const getMockUsers = () => {
  try {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const getMockItems = () => {
  try {
    const items = localStorage.getItem(MOCK_ITEMS_KEY);
    return items ? JSON.parse(items) : [];
  } catch {
    return [];
  }
};

const saveMockItems = (items) => {
  localStorage.setItem(MOCK_ITEMS_KEY, JSON.stringify(items));
};

const getCurrentMockUser = () => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// ============= Authentication Endpoints =============

export const login = async (data) => {
  if (!isFirebaseSupported) {
    const users = getMockUsers();
    
    // Seed default demo user if no users are registered yet
    if (users.length === 0) {
      const defaultUser = {
        uid: 'demo-user-123',
        email: 'demo@example.com',
        password: 'Password123',
        name: 'Demo User',
      };
      users.push(defaultUser);
      saveMockUsers(users);
    }
    
    const foundUser = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (!foundUser || foundUser.password !== data.password) {
      throw new Error('Invalid email or password');
    }
    
    const sessionUser = {
      uid: foundUser.uid,
      email: foundUser.email,
      name: foundUser.name,
    };
    
    localStorage.setItem('user', JSON.stringify(sessionUser));
    
    return {
      data: {
        token: 'mock-demo-token-' + Date.now(),
        user: sessionUser,
      },
    };
  }

  const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
  const token = await credential.user.getIdToken();
  return {
    data: {
      token,
      user: {
        uid: credential.user.uid,
        email: credential.user.email,
        name: credential.user.displayName || credential.user.email.split('@')[0],
      },
    },
  };
};

export const register = async (data) => {
  if (!isFirebaseSupported) {
    const users = getMockUsers();
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('Email already in use');
    }
    
    const newUser = {
      uid: 'user-' + Math.random().toString(36).substring(2, 11),
      email: data.email,
      password: data.password,
      name: data.name,
    };
    
    users.push(newUser);
    saveMockUsers(users);
    return {
      data: {
        success: true,
      },
    };
  }

  const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  await updateProfile(credential.user, {
    displayName: data.name,
  });
  return {
    data: {
      success: true,
    },
  };
};

export const getMe = async () => {
  if (!isFirebaseSupported) {
    const currentUser = getCurrentMockUser();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    return {
      data: currentUser,
    };
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  return {
    data: {
      uid: currentUser.uid,
      email: currentUser.email,
      name: currentUser.displayName || currentUser.email.split('@')[0],
    },
  };
};

// ============= Items Endpoints =============

export const getItems = async () => {
  if (!isFirebaseSupported) {
    const currentUser = getCurrentMockUser();
    if (!currentUser) {
      return { data: [] };
    }
    
    const items = getMockItems();
    const userItems = items.filter(item => item.userId === currentUser.uid);
    
    // Seed default welcome items so the dashboard is visually striking right away!
    if (userItems.length === 0) {
      const seededItems = [
        {
          id: 'item-demo-1',
          name: 'Welcome to YouthConnex!',
          description: 'This is a sample item generated in Offline Demo Mode. Add your live Firebase credentials in your frontend/.env file to switch to Cloud Firestore storage.',
          status: 'Active',
          userId: currentUser.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'item-demo-2',
          name: 'Empower Future Leaders',
          description: 'Create events, direct actions, and pipelines to connect youth resources with young change-makers in local neighborhoods.',
          status: 'Active',
          userId: currentUser.uid,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
        }
      ];
      const allItems = [...items, ...seededItems];
      saveMockItems(allItems);
      return { data: seededItems };
    }
    
    return { data: userItems };
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { data: [] };
  }
  const q = query(
    collection(db, 'items'),
    where('userId', '==', currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return { data: items };
};

export const getItemById = async (id) => {
  if (!isFirebaseSupported) {
    const items = getMockItems();
    const found = items.find(item => item.id === id);
    if (!found) {
      throw new Error('Item not found');
    }
    return {
      data: found,
    };
  }

  const docRef = doc(db, 'items', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Item not found');
  }
  return {
    data: {
      id: docSnap.id,
      ...docSnap.data(),
    },
  };
};

export const createItem = async (data) => {
  if (!isFirebaseSupported) {
    const currentUser = getCurrentMockUser();
    const items = getMockItems();
    
    const newItem = {
      id: 'item-' + Math.random().toString(36).substring(2, 11),
      ...data,
      userId: currentUser ? currentUser.uid : 'anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    items.push(newItem);
    saveMockItems(items);
    return {
      data: newItem,
    };
  }

  const currentUser = auth.currentUser;
  const itemData = {
    ...data,
    userId: currentUser ? currentUser.uid : 'anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, 'items'), itemData);
  return {
    data: {
      id: docRef.id,
      ...itemData,
    },
  };
};

export const updateItem = async (id, data) => {
  if (!isFirebaseSupported) {
    const items = getMockItems();
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) {
      throw new Error('Item not found');
    }
    
    const { id: _, userId: __, createdAt: ___, ...updateFields } = data;
    const updatedItem = {
      ...items[idx],
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };
    
    items[idx] = updatedItem;
    saveMockItems(items);
    return {
      data: updatedItem,
    };
  }

  // Remove id and userId from payload to prevent duplicating or altering key fields
  const { id: _, userId: __, createdAt: ___, ...updateData } = data;
  const docRef = doc(db, 'items', id);
  const payload = {
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  await updateDoc(docRef, payload);
  return {
    data: {
      id,
      ...payload,
    },
  };
};

export const deleteItem = async (id) => {
  if (!isFirebaseSupported) {
    const items = getMockItems();
    const filtered = items.filter(item => item.id !== id);
    saveMockItems(filtered);
    return {
      data: {
        success: true,
      },
    };
  }

  const docRef = doc(db, 'items', id);
  await deleteDoc(docRef);
  return {
    data: {
      success: true,
    },
  };
};


