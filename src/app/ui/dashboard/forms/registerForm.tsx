'use client';

import { formFields } from '@/app/ui/dashboard/forms/registerFields';
import { useForm } from '@/app/lib/hooks/useForm';
import React from 'react';
import FormInput from '../../global/formInput';
import FormWarning from '../../global/formWarning';
import Button from '../../global/button';

export default function RegisterForm() {
  const { getData, submit, showError, onFocus } = useForm();
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
        />
      </form>
    </div>
  );
}
