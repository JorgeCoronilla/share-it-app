import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerGroup } from '../services/registerGroup';
import { validateAddGroup } from '../validations';
import { addGroup_validation_INITIAL_STATE } from '../constants';

export const useAddGroup = (INITIAL_STATE: NewGroupData) => {
  const router = useRouter();
  const [gruopInfo, setGroupinfo] = useState(INITIAL_STATE);
  const [showError, setShowError] = useState(addGroup_validation_INITIAL_STATE);
  const [errorMessage, setErrorMessage] = useState('');

  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    addGroup_validation_INITIAL_STATE
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setShowError(validateAddGroup(gruopInfo));
  }, [gruopInfo]);

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
    const currentField = {
      ...addGroup_validation_INITIAL_STATE,
      [name]: true,
    };
    setOnFocus(currentField);
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
      const res = await itemRegistered.json();
      console.log('Message:', res.message);
      setErrorMessage(res.message);

      console.log('Error', itemRegistered.status);
      setError(true);
    }
  };
  return { getData, submit, error, loading, showError, onFocus, errorMessage };
};
