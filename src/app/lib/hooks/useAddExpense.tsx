import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerTransaction } from '../services/registerTransaction';
import { addExpense_validation_INITIAL_STATE } from '../constants';
import { validateNewExpense } from '../validations';

export const useAdd = (INITIAL_STATE: NewExpenseData) => {
  const router = useRouter();
  const [expenseInfo, setExpenseInfo] = useState(INITIAL_STATE);
  const [showError, setShowError] = useState(
    addExpense_validation_INITIAL_STATE
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    addExpense_validation_INITIAL_STATE
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setShowError(validateNewExpense(expenseInfo));
  }, [expenseInfo]);

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'icon') {
      const icons =
        document.querySelectorAll<HTMLInputElement>('input.icon-input');
      icons.forEach((icon) => {
        if (icon.id !== e.target.id) icon.checked = false;
      });
    }
    setExpenseInfo({ ...expenseInfo, [name]: value });
    const currentField = {
      ...addExpense_validation_INITIAL_STATE,
      [name]: true,
    };
    setOnFocus(currentField);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const itemRegistered = await registerTransaction(expenseInfo);
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
