'use client';
import { createGroup } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AddGroupButton() {
  const router = useRouter();
  const initialState = {
    message: false,
    display: false,
    user: 'uuid1',
  };

  const [state, formAction] = useFormState(createGroup, initialState);
  useEffect(() => {
    if (state.display) {
      router.push('/dashboard');
    }
  }, [state]);
  return (
    <>
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
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Group name"
            name="name"
          />
          <label>Descripción</label>
          <input
            type="text"
            placeholder="Group description"
            name="description"
          />
          <button
            type="submit"
            value="Create group"
            name="createGroup"
            className="submit-button"
          >
            Crear grupo
          </button>
        </form>
      </div>
    </>
  );
}
