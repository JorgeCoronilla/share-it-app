import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '../services/auth';

export const useEndRegistration = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const EndRegistration = async () => {
    setLoading(true);
    const token = searchParams.get('token') || '';
    const userRegistration = await registerUser(token);
    setLoading(false);
    if (userRegistration.ok) {
      router.push(`/login`);
    } else {
      const res = await userRegistration.json();
      setMessage(res.message);
      setError(true);
      setTimeout(() => {
        setError(false);
        router.push(`/`);
      }, 3000);
    }
  };
  return { message, loading, error, EndRegistration };
};
