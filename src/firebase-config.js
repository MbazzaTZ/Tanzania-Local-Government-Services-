import { supabase } from '../../supabase-config';
import { supabase } from '../../supabase-config';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: \\.firebaseapp.com\,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: \\.appspot.com\,
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

