import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUser } from '../services/user';

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

    const userLogged = await loginUser({
      email: login.email,
      password: login.password,
    });

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
