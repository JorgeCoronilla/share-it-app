import { useEffect } from 'react';
import { validateNewExpense } from '../validations';
import { useFormStates } from './useFormUtils';
import { deleteTransactionService } from '../services/deleteTransaction';

export const useUpdateExpense = (
  groupId: string,
  transactionId: string,
  amount: string
) => {
  const {
    getData,
    setShowError,
    setLoading,
    setError,
    setErrorMessage,
    setData,
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

  const deleteTransaction = async () => {
    setLoading(true);
    const deleteTransaction = await deleteTransactionService(
      groupId,
      transactionId,
      amount
    );
    setLoading(false);

    if (deleteTransaction.status === 200) {
      router.push(`/dashboard/${groupId}`);
    } else {
      setErrorMessage(
        'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
      );

      setError(true);
      setTimeout(() => {
        router.push(`/dashboard/${groupId}`);
      }, 2000);
    }
  };
  return {
    getData,
    deleteTransaction,
    setData,
    error,
    loading,
    showError,
    onFocus,
    errorMessage,
    data,
  };
};
