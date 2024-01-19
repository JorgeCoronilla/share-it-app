import React from 'react';
import CardTitle from '../card/cardTitle';
import { useDeleteGroup } from '@/app/lib/hooks/useDeleteGroup';
import FormWarning from '../../global/formWarning';
interface DeleteGroupProps {
  id: string;
  name: string;
}
export default function DeleteGroup({ id, name }: DeleteGroupProps) {
  const { deleteGroup, loading, errorMessage, error } = useDeleteGroup(
    id,
    name
  );

  return (
    <>
      <label className="form-label">
        ¿Estás seguro de que quieres eliminar este grupo?
      </label>
      <br />
      <CardTitle title={name} />

      <button
        onClick={deleteGroup}
        className={!loading ? 'submit-button' : 'submit-button disabled'}
        disabled={loading}
      >
        Eliminar
      </button>

      <FormWarning
        showError={error}
        message={errorMessage}
      />
      <FormWarning
        showError={loading}
        message="... Loading"
      />
    </>
  );
}
