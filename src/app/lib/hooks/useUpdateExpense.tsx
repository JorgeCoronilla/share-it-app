import { useEffect } from 'react';
import { validateNewExpense } from '../validations';
import { useFormStates } from './useFormUtils';
import { deleteTransactionService } from '../services/deleteTransaction';
import { updateTransactionService } from '../services/updateTransaction';
import { checkTransaction } from '../services/checkTransaction';

export const useUpdateExpense = (
  groupId: string,
  transactionId: string,
  amount: string,
  description: string,
  icon: string
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
    console.log(icon, description, amount);
    if (
      (data as NewExpenseData).icon === '' &&
      (data as NewExpenseData).description === '' &&
      (data as NewExpenseData).quantity === ''
    ) {
      setErrorMessage('No has cambiado ningún dato');
      setError(true);
    } else {
      setLoading(true);
      const newIcon =
        (data as NewExpenseData).icon === ''
          ? icon
          : (data as NewExpenseData).icon;
      const newDescription =
        (data as NewExpenseData).description === ''
          ? description
          : (data as NewExpenseData).description;
      const newQuantity =
        (data as NewExpenseData).quantity === ''
          ? amount
          : (data as NewExpenseData).quantity;

      const update = await updateTransactionService(
        groupId,
        transactionId,
        amount,
        newDescription,
        newIcon,
        newQuantity
      );
      setLoading(false);

      if (update.status === 200) {
        router.push(`/dashboard/${groupId}`);
      } else {
        console.log(update);
        setErrorMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );

        setError(true);
        // setTimeout(() => {
        //   router.push(`/dashboard/${groupId}`);
        // }, 2000);
      }
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
