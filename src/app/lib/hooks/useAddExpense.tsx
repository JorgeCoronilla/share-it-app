import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerTransaction } from '../services/registerTransaction';

export const useAdd = (INITIAL_STATE: NewExpenseData) => {
  const router = useRouter();
  const [expenseInfo, setExpenseInfo] = useState(INITIAL_STATE);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
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
      console.log('Error', itemRegistered.status);
      setShowError(true);
    }
  };
  return { getData, submit, showError, loading };
};
