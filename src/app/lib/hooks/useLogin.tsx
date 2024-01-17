import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { loginUser } from '../services/auth';
import { validateLogin } from '../validations';

import { useFormUtils } from './useFormUtils';

export const useLogin = () => {
  const {
    data,
    setShowError,
    setLoading,
    setError,
    getData,
    showError,
    loading,
    onFocus,
    error,
  } = useFormUtils('login');

  const prevData = useRef({});
  const router = useRouter();

  useEffect(() => {
    setShowError(validateLogin(data));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (prevData.current === data) {
      return;
    } else {
      prevData.current = data;
    }

    const userLogged = await loginUser(data);
    setLoading(false);
    if (userLogged.ok) {
      router.push(`/dashboard`);
    } else {
      console.log('Error', userLogged.status);
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
  };
};
