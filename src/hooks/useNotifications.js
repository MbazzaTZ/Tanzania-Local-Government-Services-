import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { supabase } from '../../supabase-config';
import { useAuth } from '../context/AuthContext';

export default function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'notifications'), where('userId', '==', user.id));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
      setUnreadCount(data.filter(n => n.status === 'unread').length);
    });
    return unsubscribe;
  }, [user]);

  return { notifications, unreadCount };
}

