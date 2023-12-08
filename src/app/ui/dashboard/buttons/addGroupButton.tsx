'use client';
import { useState } from 'react';
import IconUsers from '../iconsComponents/groupsIcon';
import NewGroup from '../newGroup/newGroup';
import { createGroup } from '@/app/lib/actions';

export default function AddGroupButton() {
  const [display, setDisplay] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setDisplay(!display);
    console.log('click');
  };
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

            <form action={createGroup}>
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
