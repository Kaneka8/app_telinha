import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth'; 
import { auth } from '../firebase';

export default function Index() {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return <Redirect href={user ? '/tabs/romantic' : '/login'} />;
}

// app/index.tsx

import { useAuth } from'../context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return <Redirect href={user ? '/tabs/romantic' : '/login'} />;
}

