'use client';
import { useEffect, useState } from 'react';
import IconUsers from '../iconsComponents/groupsIcon';
import { createGroup } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function AddGroupButton() {
  const initialState = {
    message: false,
    display: true,
    user: 'uuid1',
  };

  const [state, formAction] = useFormState(createGroup, initialState);
  const [display, setDisplay] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    setDisplay(state.display);
  }, [state.display]);

  return (
    <>
      <button
        className="add-button group"
        onClick={handleClick}
      >
        <div>
          <IconUsers />+
        </div>
      </button>
      {display && (
        <>
          <div className="new-group-modal">
            <button
              onClick={() => setDisplay(false)}
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
      )}
    </>
  );
}
