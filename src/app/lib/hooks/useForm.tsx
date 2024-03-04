import { useEffect } from 'react';
import { postUser } from '../services/registerUser';
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
    if (userLogged.status === 200) {
      router.push(`/register/check-email`);
    }
    if (userLogged.status === 400) {
      setErrorMessage('Complete todos los campos');
    }

    if (userLogged.status === 401) {
      setErrorMessage('Ya existe un usuario con ese email');
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 4000);
      setError(true);
    }

    if (userLogged.status === 404) {
      setErrorMessage(
        'Ya existe un usuario con ese email. Solo necesitas confirmar tu correo'
      );
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 4000);
      setError(true);
    }

    if (userLogged.status === 500) {
      setErrorMessage(
        'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
      );
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 4000);
      setError(true);
    }

    setError(true);
  };
  return { getData, submit, showError, onFocus, error, errorMessage, loading };
};
