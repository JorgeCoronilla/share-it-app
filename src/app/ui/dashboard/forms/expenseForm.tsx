'use client';
import { createExpense } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { addGroupMessageInitialState } from '@/app/lib/constants';
import React from 'react';
import IconsSelector from './iconsSelector';

interface ExpenseFormProps {
  groups?: GroupData[];
}

export default function ExpenseForm({ groups }: ExpenseFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(
    createExpense,
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
      <h1 className="modal-title">Añadir nuevo gasto</h1>
      <form action={formAction}>
        <div className="form-container">
          <div className="text-fields-container">
            <label>Grupo</label>
            <input
              type="text"
              placeholder="Group description"
              name="group"
              list="groups"
            />

            {groups && (
              <datalist id="groups">
                {groups.map((item, index) => (
                  <option
                    key={index}
                    value={item.name}
                  />
                ))}
              </datalist>
            )}

            <label>Descripción</label>
            <input
              type="text"
              placeholder="Descripción"
              name="description"
            />
            <label>Cantidad</label>
            <input
              type="text"
              placeholder="Group description"
              name="quantity"
            />
          </div>
          <IconsSelector />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Crear gasto
        </button>
      </form>
    </div>
  );
}
