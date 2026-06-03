/**
 * Firebase Opportunity Service
 * Handles all geospatial queries and opportunity data operations.
 *
 * When Firebase is NOT configured (demo mode), every exported function
 * transparently returns data from the in-memory mock dataset so the
 * map and UI work out of the box without any backend.
 */

import { isFirebaseSupported } from '../config/firebase';
import { MOCK_OPPORTUNITIES } from './mockOpportunities';
import {
  calculateDistance,
  filterNearbyOpportunities,
  sortOpportunities,
} from '../utils/geoUtils';

// ── Firestore imports (loaded only when Firebase is configured) ──
let firestoreModules = null;
let db = null;

const ensureFirestore = async () => {
  if (!isFirebaseSupported) return false;
  if (!firestoreModules) {
    try {
      const fs = await import('firebase/firestore');
      const cfg = await import('./firebaseConfig');
      firestoreModules = fs;
      db = cfg.db;
    } catch (err) {
      console.error('Failed to load Firestore modules:', err);
      return false;
    }
  }
  return !!db;
};

// ────────────────────────────────────────────────────────────────
// Mock helpers
// ────────────────────────────────────────────────────────────────

const mockDelay = () => new Promise(r => setTimeout(r, 120)); // simulate network

const getMockData = () => {
  try {
    const stored = localStorage.getItem('mock_opportunities');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Failed to parse mock opportunities from localStorage:', err);
  }
  try {
    localStorage.setItem('mock_opportunities', JSON.stringify(MOCK_OPPORTUNITIES));
  } catch (err) {
    console.error('Failed to initialize mock opportunities in localStorage:', err);
  }
  return [...MOCK_OPPORTUNITIES];
};

// ────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────

/**
 * Get all opportunities (with pagination)
 * @param {number} pageSize - Number of opportunities per page
 * @param {DocumentSnapshot} lastDoc - Last document for pagination
 * @returns {Promise<Array>} Array of opportunity objects with additional metadata
 */
export const getAllOpportunities = async (pageSize = 20, lastDoc = null) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    console.log('[Demo Mode] Serving 8 mock opportunities');
    return getMockData();
  }

  try {
    const { collection, query, where, orderBy, limit, startAfter, getDocs } =
      firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    let q;

    if (lastDoc) {
      q = query(
        oppCollection,
        where('status', '==', 'open'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize),
      );
    } else {
      q = query(
        oppCollection,
        where('status', '==', 'open'),
        orderBy('createdAt', 'desc'),
        limit(pageSize),
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
};

/**
 * Get opportunities by category/sector
 * @param {string} category - 'agriculture' | 'construction' | 'services' | 'state' | 'training'
 * @param {number} pageSize
 * @returns {Promise<Array>} Opportunities in specified category
 */
export const getOpportunitiesByCategory = async (category, pageSize = 20) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    return getMockData().filter(o => o.category === category);
  }

  try {
    const { collection, query, where, orderBy, limit, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const q = query(
      oppCollection,
      where('category', '==', category),
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc'),
      limit(pageSize),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${category} opportunities:`, error);
    return [];
  }
};

/**
 * Get opportunities within a specified radius (Client-side filtering)
 * For production with large datasets, consider using server-side geospatial queries
 * @param {number} userLat - User latitude
 * @param {number} userLon - User longitude
 * @param {number} radiusKm - Search radius
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} Nearby opportunities sorted by distance
 */
export const getNearbyOpportunities = async (
  userLat,
  userLon,
  radiusKm = 10,
  category = null,
) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    let data = getMockData();
    if (category) data = data.filter(o => o.category === category);
    return filterNearbyOpportunities(data, userLat, userLon, radiusKm);
  }

  try {
    const { collection, query, where, orderBy, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const q = query(
      oppCollection,
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc'),
    );

    const snapshot = await getDocs(q);
    let opportunities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter by category if specified
    if (category) {
      opportunities = opportunities.filter(opp => opp.category === category);
    }

    // Filter by radius and add distance
    return filterNearbyOpportunities(opportunities, userLat, userLon, radiusKm);
  } catch (error) {
    console.error('Error fetching nearby opportunities:', error);
    return [];
  }
};

/**
 * Get opportunities within geographic bounds (More efficient for maps)
 * @param {Object} bounds - { minLat, maxLat, minLon, maxLon }
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} Opportunities within bounds
 */
export const getOpportunitiesByBounds = async (bounds, category = null) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    let data = getMockData().filter(
      o =>
        o.location.latitude >= bounds.minLat &&
        o.location.latitude <= bounds.maxLat &&
        o.location.longitude >= bounds.minLon &&
        o.location.longitude <= bounds.maxLon,
    );
    if (category) data = data.filter(o => o.category === category);
    return data;
  }

  try {
    const { collection, query, where, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const q = query(
      oppCollection,
      where('status', '==', 'open'),
      where('location.latitude', '>=', bounds.minLat),
      where('location.latitude', '<=', bounds.maxLat),
    );

    let snapshot = await getDocs(q);
    let opportunities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter by longitude (Firestore doesn't support compound geo queries)
    opportunities = opportunities.filter(
      opp =>
        opp.location.longitude >= bounds.minLon &&
        opp.location.longitude <= bounds.maxLon,
    );

    // Filter by category if specified
    if (category) {
      opportunities = opportunities.filter(opp => opp.category === category);
    }

    return opportunities;
  } catch (error) {
    console.error('Error fetching opportunities by bounds:', error);
    return [];
  }
};

/**
 * Get opportunities by commune/administrative region
 * @param {string} commune - Commune name
 * @param {string} category - Optional category filter
 * @returns {Promise<Array>} Opportunities in specified commune
 */
export const getOpportunitiesByCommune = async (commune, category = null) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    let data = getMockData().filter(
      o =>
        o.location.administrativeLevel?.commune?.toLowerCase() ===
        commune.toLowerCase(),
    );
    if (category) data = data.filter(o => o.category === category);
    return data;
  }

  try {
    const { collection, query, where, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const q = query(
      oppCollection,
      where('location.administrativeLevel.commune', '==', commune),
      where('status', '==', 'open'),
    );

    let snapshot = await getDocs(q);
    let opportunities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (category) {
      opportunities = opportunities.filter(opp => opp.category === category);
    }

    return opportunities;
  } catch (error) {
    console.error('Error fetching opportunities by commune:', error);
    return [];
  }
};

/**
 * Get a single opportunity by ID
 * @param {string} opportunityId
 * @returns {Promise<Object|null>} Opportunity data or null
 */
export const getOpportunityById = async opportunityId => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    return getMockData().find(o => o.id === opportunityId) || null;
  }

  try {
    const { doc, getDoc } = firestoreModules;
    const oppDoc = doc(db, 'opportunities', opportunityId);
    const snapshot = await getDoc(oppDoc);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return null;
  }
};

/**
 * Create a new opportunity
 * @param {Object} opportunityData - Opportunity object
 * @returns {Promise<string>} New document ID
 */
export const createOpportunity = async opportunityData => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    const id = 'mock-' + Math.random().toString(36).substring(2, 9);
    console.log('[Demo Mode] Created mock opportunity:', id);
    try {
      const currentList = getMockData();
      const newOpp = {
        id,
        status: 'open',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        rating: { average: 0, count: 0 },
        ...opportunityData
      };
      const updatedList = [newOpp, ...currentList];
      localStorage.setItem('mock_opportunities', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('mock-opportunities-updated'));
    } catch (err) {
      console.error('Failed to save new mock opportunity to localStorage:', err);
    }
    return id;
  }

  try {
    const { collection, addDoc, Timestamp } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const docRef = await addDoc(oppCollection, {
      ...opportunityData,
      status: 'open',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      rating: { average: 0, count: 0 },
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating opportunity:', error);
    throw error;
  }
};

/**
 * Update an opportunity
 * @param {string} opportunityId
 * @param {Object} updateData - Fields to update
 * @returns {Promise<void>}
 */
export const updateOpportunity = async (opportunityId, updateData) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    console.log('[Demo Mode] Updated mock opportunity:', opportunityId);
    try {
      const currentList = getMockData();
      const updatedList = currentList.map(o => 
        o.id === opportunityId ? { ...o, ...updateData, updatedAt: Date.now() } : o
      );
      localStorage.setItem('mock_opportunities', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('mock-opportunities-updated'));
    } catch (err) {
      console.error('Failed to update mock opportunity in localStorage:', err);
    }
    return;
  }

  try {
    const { doc, updateDoc, Timestamp } = firestoreModules;
    const oppDoc = doc(db, 'opportunities', opportunityId);
    await updateDoc(oppDoc, {
      ...updateData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    throw error;
  }
};

/**
 * Delete an opportunity
 * @param {string} opportunityId
 * @returns {Promise<void>}
 */
export const deleteOpportunity = async opportunityId => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    console.log('[Demo Mode] Deleted mock opportunity:', opportunityId);
    try {
      const currentList = getMockData();
      const updatedList = currentList.filter(o => o.id !== opportunityId);
      localStorage.setItem('mock_opportunities', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('mock-opportunities-updated'));
    } catch (err) {
      console.error('Failed to delete mock opportunity from localStorage:', err);
    }
    return;
  }

  try {
    const { doc, deleteDoc } = firestoreModules;
    const oppDoc = doc(db, 'opportunities', opportunityId);
    await deleteDoc(oppDoc);
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    throw error;
  }
};

/**
 * Get featured opportunities (for homepage, etc)
 * @param {number} count - Number of featured opportunities to retrieve
 * @returns {Promise<Array>} Featured opportunities
 */
export const getFeaturedOpportunities = async (count = 10) => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    return getMockData()
      .filter(o => o.featured)
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
      .slice(0, count);
  }

  try {
    const { collection, query, where, orderBy, limit, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const q = query(
      oppCollection,
      where('featured', '==', true),
      where('status', '==', 'open'),
      orderBy('rating.average', 'desc'),
      limit(count),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching featured opportunities:', error);
    return [];
  }
};

/**
 * Search opportunities by multiple criteria
 * @param {Object} filters - Filter criteria
 * @returns {Promise<Array>} Matching opportunities
 */
export const searchOpportunities = async filters => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    let results = getMockData();

    if (filters.category) {
      results = results.filter(o => o.category === filters.category);
    }
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      results = results.filter(
        o =>
          o.title.toLowerCase().includes(kw) ||
          o.description.toLowerCase().includes(kw),
      );
    }
    if (filters.minSalary) {
      results = results.filter(
        o => (o.compensation?.dailyRate || 0) >= filters.minSalary,
      );
    }
    if (filters.skillLevel) {
      results = results.filter(
        o => o.jobDetails?.skillLevel === filters.skillLevel,
      );
    }
    if (filters.durationType) {
      results = results.filter(o => o.duration?.type === filters.durationType);
    }

    return sortOpportunities(results, filters.sortBy || 'recent');
  }

  try {
    const { collection, query, where, orderBy, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');

    // Base query - all open opportunities
    const q = query(
      oppCollection,
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc'),
    );

    const snapshot = await getDocs(q);
    let opportunities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Apply category filter
    if (filters.category) {
      opportunities = opportunities.filter(
        opp => opp.category === filters.category,
      );
    }

    // Apply keyword search (in title/description)
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      opportunities = opportunities.filter(
        opp =>
          opp.title.toLowerCase().includes(keyword) ||
          opp.description.toLowerCase().includes(keyword),
      );
    }

    // Apply salary filter
    if (filters.minSalary) {
      opportunities = opportunities.filter(
        opp => (opp.compensation.dailyRate || 0) >= filters.minSalary,
      );
    }

    // Apply skill level filter
    if (filters.skillLevel) {
      opportunities = opportunities.filter(
        opp => opp.jobDetails.skillLevel === filters.skillLevel,
      );
    }

    // Apply duration filter
    if (filters.durationType) {
      opportunities = opportunities.filter(
        opp => opp.duration.type === filters.durationType,
      );
    }

    // Sort results
    const sortBy = filters.sortBy || 'recent';
    opportunities = sortOpportunities(opportunities, sortBy);

    return opportunities;
  } catch (error) {
    console.error('Error searching opportunities:', error);
    return [];
  }
};

/**
 * Get state HIMO projects by commune
 * @param {string} commune
 * @returns {Promise<Array>} State projects in commune
 */
export const getStateProjectsByCommune = async commune => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    return getMockData().filter(
      o =>
        o.category === 'state' &&
        o.location.administrativeLevel?.commune?.toLowerCase() ===
          commune.toLowerCase(),
    );
  }

  try {
    const { collection, query, where, getDocs } = firestoreModules;
    const projectsCollection = collection(db, 'stateProjects');
    const q = query(
      projectsCollection,
      where('location.administrativeLevel.commune', '==', commune),
      where('status', '==', 'recruiting'),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching state projects:', error);
    return [];
  }
};

/**
 * Get dashboard statistics for opportunities
 * @returns {Promise<Object>} Dashboard stats
 */
export const getOpportunityStats = async () => {
  if (!(await ensureFirestore())) {
    await mockDelay();
    const data = getMockData();
    return {
      total: data.length,
      byCategory: {
        agriculture: data.filter(o => o.category === 'agriculture').length,
        construction: data.filter(o => o.category === 'construction').length,
        services: data.filter(o => o.category === 'services').length,
        state: data.filter(o => o.category === 'state').length,
        training: data.filter(o => o.category === 'training').length,
      },
      totalVacancies: data.reduce(
        (sum, o) => sum + (o.jobDetails?.vacancies || 0),
        0,
      ),
      featured: data.filter(o => o.featured).length,
    };
  }

  try {
    const { collection, query, where, getDocs } = firestoreModules;
    const oppCollection = collection(db, 'opportunities');
    const q = query(oppCollection, where('status', '==', 'open'));

    const snapshot = await getDocs(q);
    const opportunities = snapshot.docs.map(doc => doc.data());

    const stats = {
      total: opportunities.length,
      byCategory: {
        agriculture: opportunities.filter(o => o.category === 'agriculture')
          .length,
        construction: opportunities.filter(o => o.category === 'construction')
          .length,
        services: opportunities.filter(o => o.category === 'services').length,
        state: opportunities.filter(o => o.category === 'state').length,
        training: opportunities.filter(o => o.category === 'training').length,
      },
      totalVacancies: opportunities.reduce(
        (sum, o) => sum + (o.jobDetails?.vacancies || 0),
        0,
      ),
      featured: opportunities.filter(o => o.featured).length,
    };

    return stats;
  } catch (error) {
    console.error('Error fetching opportunity stats:', error);
    return {};
  }
};
