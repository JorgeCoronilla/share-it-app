'use client';
import { createGroup } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { addGroupMessageInitialState } from '@/app/lib/constants';
import IconsSelector from '@/app/ui/dashboard/forms/iconsSelector';
import TextInputsGroups from '@/app/ui/dashboard/forms/textInputsGroups';

export default function AddGroupButton() {
  const router = useRouter();

  const [state, formAction] = useFormState(
    createGroup,
    addGroupMessageInitialState
  );

  useEffect(() => {
    if (state.display) {
      router.push('/dashboard');
      console.log('Group created');
    }
  }, [state]);

  return (
    <div className="new-group-modal">
      <button
        onClick={() => router.push('/dashboard')}
        className="close-modal"
      >
        <div className="close-container">
          <img
            src="/icons/close-icon.svg"
            alt="Avatar"
          />
        </div>
      </button>
      <div className="spacer"></div>
      <h1 className="modal-title">Crear nuevo grupo</h1>
      <form action={formAction}>
        <div className="form-container">
          <TextInputsGroups />
          <IconsSelector />
        </div>
        <button
          type="submit"
          className="submit-button"
        >
          Crear grupo
        </button>
      </form>
    </div>
  );
}
