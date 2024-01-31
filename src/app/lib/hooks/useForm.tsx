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
    if (userLogged.status === 200) {
      router.push(`/register/check-email`);
    } else {
      if (userLogged.status === 400) {
        setErrorMessage('Complete todos los campos');
      }

      if (userLogged.status === 404) {
        setErrorMessage('Ya existe un usuario con ese email');
      }

      if (userLogged.status === 404) {
        setErrorMessage(
          'Ya existe un usuario con ese email. Confirma tu correo'
        );
      }

      if (userLogged.status === 500) {
        setErrorMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );
      }
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
      setError(true);

      console.log('Error:', userLogged.status);
    }
  };
  return { getData, submit, showError, onFocus, error, errorMessage, loading };
};
