'use client';
import FormHeader from '@/app/ui/dashboard/forms/formHeader';
import Button from '@/app/ui/global/button';
import FormWarning from '@/app/ui/global/formWarning';
import React from 'react';
import { useEndRegistration } from '@/app/lib/hooks/useEndRegister';

export default function Page() {
  const { message, loading, error, EndRegistration } = useEndRegistration();
  return (
    <div className="form-body">
      <FormHeader title="Ya casi lo tienes!" />
      <button
        className="submit-button"
        onClick={EndRegistration}
      >
        confirmar correo
      </button>
      <Button
        text="Confirmar correo"
        type={undefined}
      />
      <FormWarning
        showError={error}
        message={message}
      />
      <FormWarning
        showError={loading}
        message={'... loading'}
      />
    </div>
  );
}
