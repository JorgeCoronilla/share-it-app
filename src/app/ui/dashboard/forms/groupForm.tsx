'use client';
import React from 'react';
import IconsSelector from './iconsSelector';
import Button from '../../global/button';
import TextInputsGroups from './textInputsGroups';

import FormWarning from '../../global/formWarning';
import { useAddGroup } from '@/app/lib/hooks/useAddGroup';

export default function GroupForm() {
  const {
    getData,
    submit,
    handleClick,
    error,
    loading,
    showError,
    onFocus,
    errorMessage,
    focusContainer,
  } = useAddGroup();

  return (
    <>
      <form onSubmit={submit}>
        <TextInputsGroups
          getData={getData}
          onClick={handleClick}
        />
        <IconsSelector
          getData={getData}
          onClick={handleClick}
          focusContainer={focusContainer}
        />

        <Button
          type="submit"
          text="Crear grupo"
          className={
            showError.allfields && !loading
              ? 'submit-button'
              : 'submit-button disabled'
          }
          disabled={!showError.allfields}
        />
      </form>
      <FormWarning
        showError={error}
        message={errorMessage}
      />
      <FormWarning
        showError={loading}
        message="... Loading"
      />
      <FormWarning
        showError={showError.name && onFocus.name}
        message="Nombre de grupo no válido"
      />
      <FormWarning
        showError={showError.description && onFocus.description}
        message="Descripción no válida"
      />
      <FormWarning
        showError={showError.icon}
        message="Selecciona un icono"
      />
    </>
  );
}
