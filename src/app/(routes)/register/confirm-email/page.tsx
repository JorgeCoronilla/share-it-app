'use client';

import { useRegister } from '@/app/lib/hooks/useRegister';
import { formFields } from '@/app/ui/dashboard/forms/registerFields';
import Button from '@/app/ui/global/button';
import FormInput from '@/app/ui/global/formInput';
import FormWarning from '@/app/ui/global/formWarning';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token') || '';
  const { getData, submit, showError, onFocus, errorMessage, error, loading } =
    useRegister();

  return (
    <div className="loginForm">
      <form
        className="login-form"
        onSubmit={submit}
      >
        <h1>Nuevo usuario</h1>
        {formFields.map((field) => (
          <div key={`container-${field.name}`}>
            <FormInput
              key={field.name}
              getData={getData}
              label={field.label}
              type={field.type}
              name={field.name}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
            />
            <FormWarning
              key={`warning-${field.name}`}
              showError={showError[field.name] && onFocus[field.name]}
              message={field.message}
            />
          </div>
        ))}

        <Button
          type="submit"
          text="Registrarse"
          className={
            !showError.allfields && !loading
              ? 'submit-button'
              : 'submit-button disabled'
          }
          disabled={showError.allfields}
        />
        <FormWarning
          showError={loading}
          message="... loading"
        />
        <FormWarning
          showError={error}
          message={errorMessage}
        />
      </form>
    </div>
  );
}
