import { useEffect } from 'react';
import { addFriendToGroup } from '../services/inviteFriend';
import { validateNewFriend } from '../validations';
import { useFormStates } from './useFormUtils';

export const useAddFriend = (user: User) => {
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
  } = useFormStates('friends');

  useEffect(() => {
    setShowError(validateNewFriend(data as NewFriend));
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkData = data as NewFriend;
    if (checkData.email.toString() === user.email) {
      setShowError({ ...showError, email: true });
      setErrorMessage('No puedes añadirte a ti mismo');
      setError(true);

      return;
    }
    setLoading(true);
    const newFriendPetition = {
      email: checkData.email,
      group_name: checkData.group,
      hostName: user.name,
    };

    const itemRegistered = await addFriendToGroup(newFriendPetition);
    setLoading(false);

    if (itemRegistered.ok) {
      router.push(`/dashboard`);
    } else {
      console.log('Error', itemRegistered.status);
      const res = await itemRegistered.json();
      setErrorMessage(res.message);
      setError(true);
    }
  };
  return {
    getData,
    submit,
    showError,
    loading,
    error,
    onFocus,
    errorMessage,
  };
};
