'use client';
import React from 'react';
import IconsSelector from './iconsSelector';
import Button from '../../global/button';
import TextInputsGroups from './textInputsGroups';
import { useAddAction } from '@/app/lib/hooks/useAddAction';
import { createGroup } from '@/app/lib/services/formActions';

export default function GroupForm() {
  const { formAction } = useAddAction({ createFunction: createGroup });

  return (
    <>
      <form action={formAction}>
        <div className="form-container">
          <TextInputsGroups />
          <IconsSelector />
        </div>

        <Button
          type="submit"
          className="submit-button"
          text="Crear grupo"
        />
      </form>
    </>
  );
}
