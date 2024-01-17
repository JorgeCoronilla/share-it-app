import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addFriendToGroup } from '../services/inviteFriend';
import {
  addFriend_INITIAL_STATE,
  addFriend_validation_INITIAL_STATE,
} from '../constants';
import { validateNewFriend } from '../validations';

export const useAddFriend = (user: User) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const [newFriend, setNewFriend] = useState(addFriend_INITIAL_STATE);
  const [showError, setShowError] = useState(
    addFriend_validation_INITIAL_STATE
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    addFriend_validation_INITIAL_STATE
  );

  useEffect(() => {
    setShowError(validateNewFriend(newFriend));
  }, [newFriend]);

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewFriend({ ...newFriend, [name]: value });
    const currentField = {
      ...addFriend_validation_INITIAL_STATE,
      [name]: true,
    };
    setOnFocus(currentField);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFriend.email === user.email) {
      setShowError({ ...showError, email: true });
      setErrorMessage('No puedes añadirte a ti mismo');
      setError(true);

      return;
    }
    setLoading(true);

    const itemRegistered = await addFriendToGroup(newFriend);
    setLoading(false);

    if (itemRegistered.ok) {
      router.push(`/dashboard`);
    } else {
      console.log('Error', itemRegistered.status);
      const res = await itemRegistered.json();
      console.log('Message:', res.message);
      setErrorMessage(res.message);
      setError(true);
    }
  };
  return { getData, submit, showError, loading, error, onFocus, errorMessage };
};
