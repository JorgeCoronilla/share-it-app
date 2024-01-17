import { useEffect, useRef } from 'react';
import { loginUser } from '../services/auth';
import { validateLogin } from '../validations';
import { useFormStates } from './useFormUtils';

export const useLogin = () => {
  const {
    getData,
    setShowError,
    setLoading,
    setError,
    setErrorMessage,
    data,
    showError,
    onFocus,
    loading,
    error,
    errorMessage,
    router,
  } = useFormStates('login');

  const prevData = useRef({});

  useEffect(() => {
    setShowError(validateLogin(data as userLogin));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (prevData.current === data) {
      return;
    } else {
      prevData.current = data;
    }

    const userLogged = await loginUser(data as userLogin);
    setLoading(false);
    if (userLogged.ok) {
      router.push(`/dashboard`);
    } else {
      console.log('Error', userLogged.status);
      const res = await userLogged.json();
      console.log('Message:', res.message);
      setErrorMessage(res.message);

      setError(true);
    }
  };
  return {
    login: data,
    getData,
    submit,
    showError,
    loading,
    onFocus,
    error,
    errorMessage,
  };
};
