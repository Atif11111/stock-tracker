'use client';

import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  email: string;
  investmentGoals: string;
  riskTolerance: string;
  preferredIndustry: string;
}

export const useProfileData = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/profile');
      const result = await response.json();
      if (result) {
        setData(result);
      }
    } catch (e) {
      console.error('Failed to fetch profile data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
};