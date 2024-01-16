import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addFriendToGroup } from '../services/inviteFriend';

export const useAddFriend = (INITIAL_STATE: NewFriend, user: User) => {
  const router = useRouter();
  const [newFriend, setNewFriend] = useState(INITIAL_STATE);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewFriend({ ...newFriend, [name]: value });
    console.log(newFriend);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFriend.email === user.email) {
      setShowError(true);
      return;
    }
    setLoading(true);

    const itemRegistered = await addFriendToGroup(newFriend);
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
