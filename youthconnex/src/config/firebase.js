import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// Check if Firebase credentials are valid and not placeholders
export const isFirebaseSupported = 
  !!apiKey && 
  apiKey !== 'your-api-key' && 
  apiKey.trim() !== '';

let app = null;
let auth = null;
let db = null;

if (isFirebaseSupported) {
  try {
    const firebaseConfig = {
      apiKey: apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };
    
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.error('Failed to initialize Firebase SDK:', err);
  }
} else {
  console.warn(
    'YouthConnex: Running in local Demo Mode. Set valid Firebase config in .env for Cloud storage.'
  );
}

export { app, auth, db };
export default app;

