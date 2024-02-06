import { useEffect } from 'react';
import { useFormStates } from './useFormUtils';
import { validateForm, validateInvitation } from '../validations';
import { registerUserFromInvitation } from '../services/registerUser';

export const useInvitationForm = (token: string) => {
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
  } = useFormStates('invitation');

  useEffect(() => {
    setShowError(validateInvitation(data as Register));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const checkData = data as Register;

    const userLogged = await registerUserFromInvitation({
      name: checkData.name,
      email: checkData.email,
      password: checkData.password,
      token,
    });
    setLoading(false);
    if (userLogged.ok) {
      router.push(`/login`);
    }
    if (userLogged.status === 400) {
      setErrorMessage('Complete todos los campos');
    }
    if (userLogged.status === 401) {
      setErrorMessage('El usuario ya existe');
    }
    if (userLogged.status === 404) {
      setErrorMessage('Este grupo ya no existe');
    }
    if (userLogged.status === 500) {
      setErrorMessage(
        'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
      );
      setTimeout(() => {
        router.push(`/`);
      }, 5000);
    }

    setError(true);
  };
  return { getData, submit, showError, onFocus, error, errorMessage, loading };
};
