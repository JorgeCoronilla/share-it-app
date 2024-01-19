'use client';
import FormHeader from '@/app/ui/dashboard/forms/formHeader';
import DeleteGroup from '@/app/ui/dashboard/warnings/deleteGroup';
import { useSearchParams } from 'next/navigation';

export default function AddGroupButton() {
  const searchParams = useSearchParams();

  const group = searchParams.get('group');
  const name = searchParams.get('name');

  if (!group || !name) {
    return null;
  }

  return (
    <div className="new-group-modal">
      <FormHeader title="Eliminar grupo 2" />
      <div className="spacer"></div>
      <DeleteGroup
        id={group}
        name={name}
      />
    </div>
  );
}
