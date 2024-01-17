'use client';
import React from 'react';
import FormInput from '../../global/formInput';
import FormWarning from '../../global/formWarning';
import Button from '../../global/button';
import { useLogin } from '@/app/lib/hooks/useLogin';
import FormHeader from './formHeader';

export default function LoginForm() {
  const { getData, submit, showError, loading, error, onFocus, errorMessage } =
    useLogin();

  return (
    <div className="new-group-modal">
      <FormHeader title="Login" />
      <form
        className="login-form"
        onSubmit={submit}
      >
        <FormInput
          getData={getData}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="email@me.com"
        />
        <FormWarning
          showError={showError.email && onFocus.email}
          message="Email no válido"
        />
        <FormInput
          getData={getData}
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="**********"
        />
        <FormWarning
          showError={showError.password && onFocus.password}
          message="Contraseña no válida"
        />
        <FormWarning
          showError={error}
          message={errorMessage}
        />
        <FormWarning
          showError={loading}
          message="... loading"
        />
        <Button
          type="submit"
          text="Login"
          className={
            !showError.email && !showError.password
              ? 'submit-button'
              : 'submit-button disabled'
          }
          disabled={showError.email && showError.password}
        />
      </form>
    </div>
  );
}
