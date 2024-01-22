import { useEffect } from 'react';
import { useFormStates } from './useFormUtils';
import { validateForm, validateInvitation } from '../validations';
import { registerUserFromInvitation } from '../services/auth';

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
      // router.push(`/register/check-email`);
      console.log('Llega aca');
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
