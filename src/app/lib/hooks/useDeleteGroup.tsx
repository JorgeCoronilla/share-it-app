import { deleteGroupService } from '../services/deleteGroup';
import { useFormStates } from './useFormUtils';

export const useDeleteGroup = (id: string, name: string) => {
  const {
    setLoading,
    setError,
    setErrorMessage,

    loading,
    error,
    errorMessage,
    router,
  } = useFormStates('friends');

  const deleteGroup = async () => {
    setLoading(true);
    const deletedGroup = await deleteGroupService(id, name);

    if (deletedGroup.ok) {
      setLoading(false);
      router.push(`/dashboard`);
    } else {
      if (deletedGroup.status === 404) {
        setErrorMessage(
          'Las deudas de este grupo no están saldadas. No se puede cerrar'
        );
      } else {
        setErrorMessage(
          'Algo ha ido mal, inténtelo más tarde o contacte con Share-it'
        );
      }
      console.log('Error', deletedGroup.status);

      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
        setLoading(false);
      }, 3000);
    }
  };

  return { deleteGroup, loading, errorMessage, error };
};
