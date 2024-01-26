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
    <div className="form-container">
      <div className="form-body">
        <FormHeader title={`Eliminar ${name}`} />
        <div className="spacer"></div>
        <DeleteGroup
          id={group}
          name={name}
        />
      </div>
    </div>
  );
}
