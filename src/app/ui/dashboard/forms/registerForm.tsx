'use client';

import { formFields } from '@/app/ui/dashboard/forms/registerFields';
import { useForm } from '@/app/lib/hooks/useForm';
import React from 'react';
import FormInput from '../../global/formInput';
import FormWarning from '../../global/formWarning';
import Button from '../../global/button';
import FormHeader from './formHeader';

export default function RegisterForm() {
  const { getData, submit, showError, onFocus, errorMessage, error, loading } =
    useForm();

  return (
    <div className="form-body">
      <FormHeader title="Nuevo usuario" />
      <form
        className="form-main"
        onSubmit={submit}
      >
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
