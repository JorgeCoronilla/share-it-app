'use client';

import React from 'react';
import { useEndRegistration } from '@/app/lib/hooks/useEndRegister';
import FormHeader from '@/app/ui/components/dashboard/forms/formHeader';
import FormWarning from '@/app/ui/components/dashboard/warnings/formWarning';
import Button from '@/app/ui/components/global/button';

export default function Page() {
  const { message, loading, error, EndRegistration } = useEndRegistration();
  return (
    <div className="form-container">
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
    </div>
  );
}
