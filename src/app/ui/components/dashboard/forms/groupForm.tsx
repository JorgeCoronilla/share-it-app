'use client';
import React from 'react';
import IconsSelector from './iconsSelector';
import Button from '../../global/button';
import TextInputsGroups from './textInputsGroups';

import FormWarning from '../warnings/formWarning';
import { useAddGroup } from '@/app/lib/hooks/useAddGroup';
import Loading from '../../global/loading';
import FormError from '../warnings/formError';

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
          showError={showError}
          onFocus={onFocus}
        />
        <IconsSelector
          getData={getData}
          onClick={handleClick}
          focusContainer={focusContainer}
        />
        <FormWarning
          showError={showError.icon}
          message="Selecciona un icono"
          icon={true}
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
