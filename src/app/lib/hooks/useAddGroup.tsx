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
    data,
    showError,
    onFocus,
    loading,
    error,
    errorMessage,
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
      console.log(data);
      router.push(`/dashboard`);
    } else {
      const res = await itemRegistered.json();
      console.log('Message:', res.message);
      setErrorMessage(res.message);

      console.log('Error', itemRegistered.status);
      setError(true);
    }
  };
  return { getData, submit, error, loading, showError, onFocus, errorMessage };
};
