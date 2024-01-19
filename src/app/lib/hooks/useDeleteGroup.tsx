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
      console.log('Error', deletedGroup.status);
      const res = await deletedGroup.json();
      setErrorMessage(res.message);
      setError(true);
      setTimeout(() => {
        router.push(`/dashboard`);
        setLoading(false);
      }, 3000);
    }
  };

  return { deleteGroup, loading, errorMessage, error };
};
