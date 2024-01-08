import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLogin = () => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLogged = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Weeee', userLogged);

    if (userLogged.ok) {
      const data = await userLogged.json();
      router.push(`/dashboard`);
    } else {
      console.log('Error', userLogged.status);
      setShowError(true);
    }
  };
  return {
    getData,
    submit,
    showError,
  };
};
