import { useEffect } from 'react';
import { addFriendToGroup } from '../services/inviteFriend';
import { validateNewFriend } from '../validations';
import { useFormStates } from './useFormUtils';

export const useAddFriend = (user: User, groups: GroupData[]) => {
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
    var groupName: string = '';
    e.preventDefault();
    groups.forEach((item) => {
      if (item.id === (data as NewFriend).group) {
        groupName = item.name;
      }
    });
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
      group_id: checkData.group,
      group_name: groupName,
      hostName: user.name,
    };
    const itemRegistered = await addFriendToGroup(newFriendPetition);
    setLoading(false);

    if (itemRegistered.status === 200) {
      setErrorMessage('Amigo añadido a tu grupo');
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 5000);
    }
    if (itemRegistered.status === 201) {
      setErrorMessage(
        'Usuario no registrado. Hemos enviado un correo de invitación'
      );
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 5000);
    }

    if (itemRegistered.status === 400) {
      setErrorMessage('Complete todos los campos');
      setError(true);
    }
    if (itemRegistered.status === 503) {
      setErrorMessage('El email no se ha podido enviar');
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 5000);
    }
    if (itemRegistered.status === 404) {
      setError(true);

      setErrorMessage('Tu amig@ ya está en el grupo');
    }
    if (itemRegistered.status === 500) {
      setErrorMessage(
        'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
      );
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 5000);
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
