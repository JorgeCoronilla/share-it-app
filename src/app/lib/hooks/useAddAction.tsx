import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { addMessageInitialState } from '../constants';
import { useEffect } from 'react';

interface addActionProps {
  createFunction: (
    prevState: InitialMessageState,
    formData: FormData
  ) => Promise<InitialMessageState>;
}

export const useAddAction = ({ createFunction }: addActionProps) => {
  const router = useRouter();

  const [state, formAction] = useFormState(
    createFunction,
    addMessageInitialState
  );

  useEffect(() => {
    if (state.display) {
      // router.push('/dashboard');
      console.log('Group created');
    }
  }, [state]);
  return { formAction };
};
