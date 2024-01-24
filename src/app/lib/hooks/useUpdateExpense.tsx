import { useEffect } from 'react';
import { validateNewExpense } from '../validations';
import { useFormStates } from './useFormUtils';
import { deleteTransactionService } from '../services/deleteTransaction';
import { updateTransactionService } from '../services/updateTransaction';
import { checkTransaction } from '../services/checkTransaction';

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
    handleClick,
    data,
    showError,
    onFocus,
    loading,
    error,
    errorMessage,
    router,
    focusContainer,
  } = useFormStates('expenses');

  useEffect(() => {
    check();
  }, []);
  useEffect(() => {
    setShowError(validateNewExpense(data as NewExpenseData));
  }, [data]);

  const check = async () => {
    const res = await checkTransaction(transactionId);
    if (res.status !== 200) {
      setError(true);
      setErrorMessage('No puedes modificar una transación que no es tuya');
      setTimeout(() => {
        router.push(`/dashboard/${groupId}`);
      }, 3000);
    }
    return res;
  };
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

  const updateTransaction = async () => {
    setLoading(true);
    const update = await updateTransactionService(
      groupId,
      transactionId,
      amount,
      (data as NewExpenseData).description,
      (data as NewExpenseData).icon,
      (data as NewExpenseData).quantity
    );
    setLoading(false);

    if (update.status === 200) {
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
    handleClick,
    error,
    loading,
    showError,
    onFocus,
    errorMessage,
    data,
    focusContainer,
    updateTransaction,
  };
};
