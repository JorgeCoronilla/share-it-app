import { useEffect } from 'react';
import { postUser } from '../services/auth';
import { useFormStates } from './useFormUtils';
import { validateForm } from '../validations';

export const useForm = () => {
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
  } = useFormStates('register');

  useEffect(() => {
    setShowError(validateForm(data as Register));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const checkData = data as Register;

    const userLogged = await postUser({
      name: checkData.name,
      email: checkData.email,
      password: checkData.password,
    });
    setLoading(false);
    if (userLogged.ok) {
      router.push(`/login`);
    } else {
      console.log('Error:', userLogged.status);
      const res = await userLogged.json();
      console.log('Message:', res.message);
      setErrorMessage(res.message);

      setError(true);
    }
  };
  return { getData, submit, showError, onFocus, error, errorMessage, loading };
};
