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

    if (itemRegistered.status === 200) {
      setErrorMessage('Amigo añadido a tu grupo');
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    }
    if (itemRegistered.status === 201) {
      setErrorMessage(
        'Usuario no registrado. Hemos enviado un correo de invitación'
      );
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    } else {
      console.log('Error', itemRegistered.status);
      if (itemRegistered.status === 400) {
        setErrorMessage('Complete todos los campos');
      }
      if (itemRegistered.status === 503) {
        setErrorMessage('El email no se ha podido enviar');
      }
      if (itemRegistered.status === 404) {
        setErrorMessage('El grupo no existe');
      } else {
        setErrorMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );
      }
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
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
