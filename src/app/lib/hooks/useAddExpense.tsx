import { useEffect } from 'react';
import { registerTransaction } from '../services/registerTransaction';
import { validateNewExpense } from '../validations';
import { useFormStates } from './useFormUtils';

export const useAddExpense = () => {
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
  } = useFormStates('expenses');

  useEffect(() => {
    setShowError(validateNewExpense(data as NewExpenseData));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const itemRegistered = await registerTransaction(data as NewExpenseData);
    setLoading(false);

    if (itemRegistered.status === 200) {
      const data = await itemRegistered.json();
      console.log(data);
      router.push(`/dashboard`);
    } else {
      const res = await itemRegistered.json();
      console.log('Message:', res.message);
      if (itemRegistered.status === 400) {
        setErrorMessage('Complete todos los campos');
      }
      if (itemRegistered.status === 404) {
        setErrorMessage('El grupo no existe');
      } else {
        setErrorMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );
      }

      console.log('Error', itemRegistered.status);
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    }
  };
  return { getData, submit, error, loading, showError, onFocus, errorMessage };
};
