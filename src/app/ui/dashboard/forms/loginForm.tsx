'use client';
import React from 'react';
import FormInput from '../../global/formInput';
import FormWarning from '../warnings/formWarning';
import Button from '../../global/button';
import { useLogin } from '@/app/lib/hooks/useLogin';
import FormHeader from './formHeader';
import FormError from '../warnings/formError';
import Loading from '../../global/loading';

export default function LoginForm() {
  const { getData, submit, showError, loading, error, onFocus, errorMessage } =
    useLogin();

  return (
    <div className="form-body">
      <FormHeader title="Login" />
      <form
        className="form-main"
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

        <Button
          type="submit"
          text="Login"
          className={
            !showError.email && !loading
              ? 'submit-button'
              : 'submit-button disabled'
          }
          disabled={showError.email}
        />
      </form>
      <FormError
        showError={error}
        message={errorMessage}
      />
      <Loading
        showError={loading}
        message="... loading"
      />
    </div>
  );
}
