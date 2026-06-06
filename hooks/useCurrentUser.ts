'use client';

import { useEffect, useState } from 'react';

interface UserData {
  name: string;
  email: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        });
        const data = await response.json();
        
        if (data?.user) {
          setUser({
            name: data.user.name || 'User',
            email: data.user.email || '',
          });
        }
      } catch (e) {
        console.error('Failed to fetch user:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};