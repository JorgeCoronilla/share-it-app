import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { registerUser } from '../services/registerUser';

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
      router.push(`/dashboard`);
      console.log('ok');
    } else {
      if (userRegistration.status === 400) {
        setMessage('Usuario o grupo no encontrado.');
      }

      if (userRegistration.status === 401) {
        setMessage('El usuario ya existe');
      }
      if (userRegistration.status === 404) {
        setMessage('El usuario no existe o link expirado');
      }
      if (userRegistration.status === 500) {
        setMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );
      }

      setError(true);
      setTimeout(() => {
        setError(false);
        setLoading(true);
        router.push(`/`);
      }, 4000);
    }
  };
  return { message, loading, error, EndRegistration };
};
