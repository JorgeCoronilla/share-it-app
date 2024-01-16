import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerGroup } from '../services/registerGroup';

export const useAddGroup = (INITIAL_STATE: NewGroupData) => {
  const router = useRouter();
  const [gruopInfo, setGroupinfo] = useState(INITIAL_STATE);
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

    setGroupinfo({ ...gruopInfo, [name]: value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const itemRegistered = await registerGroup(gruopInfo);
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
