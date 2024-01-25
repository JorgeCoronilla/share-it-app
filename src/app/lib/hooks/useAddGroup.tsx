import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerGroup } from '../services/registerGroup';
import { validateAddGroup } from '../validations';
import { useFormStates } from './useFormUtils';

export const useAddGroup = () => {
  const {
    getData,
    setShowError,
    setLoading,
    setError,
    setErrorMessage,
    handleClick,
    data,
    showError,
    onFocus,
    loading,
    error,
    errorMessage,
    focusContainer,
    router,
  } = useFormStates('groups');
  useEffect(() => {
    setShowError(validateAddGroup(data as NewGroupData));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const itemRegistered = await registerGroup(data as NewGroupData);
    setLoading(false);

    if (itemRegistered.ok) {
      const data = await itemRegistered.json();
      router.push(`/dashboard`);
    } else {
      if (itemRegistered.status === 400) {
        setErrorMessage('Complete todos los campos');
      }

      if (itemRegistered.status === 404) {
        setErrorMessage('Ya existe un grupo con ese nombre');
      } else {
        setErrorMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );
      }
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
      setError(true);

      console.log('Error', itemRegistered.status);
      setError(true);
    }
  };
  return {
    getData,
    submit,
    handleClick,
    error,
    loading,
    showError,
    onFocus,
    focusContainer,
    errorMessage,
  };
};
