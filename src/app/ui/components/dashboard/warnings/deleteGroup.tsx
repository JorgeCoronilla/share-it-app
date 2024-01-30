import React from 'react';
import { useDeleteGroup } from '@/app/lib/hooks/useDeleteGroup';
import FormError from './formError';
import Loading from '../../global/loading';
import CardSubtitle from '../card/cardSubtitle';
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
      <CardSubtitle
        subtitle={'¿Estás seguro de que quieres eliminar este grupo?'}
      />

      <br />

      <button
        onClick={deleteGroup}
        className={!loading ? 'submit-button' : 'submit-button disabled'}
        disabled={loading}
      >
        Eliminar
      </button>

      <FormError
        showError={error}
        message={errorMessage}
      />
      <Loading
        showError={loading}
        message="... Loading"
      />
    </>
  );
}
