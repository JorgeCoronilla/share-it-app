'use client';
import React from 'react';
import IconsSelector from './iconsSelector';
import Button from '../../global/button';
import TextInputsGroups from './textInputsGroups';

import { group_INTIAL_STATE } from '@/app/lib/constants';
import FormWarning from '../../global/formWarning';
import { useAddGroup } from '@/app/lib/hooks/useAddGroup';

export default function GroupForm() {
  const { getData, submit, showError, loading } =
    useAddGroup(group_INTIAL_STATE);

  return (
    <>
      <form onSubmit={submit}>
        <div className="form-container">
          <TextInputsGroups getData={getData} />
          <IconsSelector getData={getData} />
        </div>

        <Button
          type="submit"
          className="submit-button"
          text="Crear grupo"
        />
      </form>
      <FormWarning
        showError={showError}
        message="Error con el formato"
      />
      <FormWarning
        showError={loading}
        message="... Loading"
      />
    </>
  );
}
