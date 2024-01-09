'use client';
import React from 'react';
import FormInput from '../../global/formInput';
import FormWarning from '../../global/formWarning';
import Button from '../../global/button';
import { useLogin } from '@/app/lib/hooks/useLogin';
import FormHeader from './formHeader';

export default function LoginForm() {
  const { getData, submit, showError } = useLogin();

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
        <FormInput
          getData={getData}
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="**********"
        />
        <FormWarning
          showError={showError}
          message="User not found"
        />
        <Button
          type="submit"
          text="Login"
          className="submit-button"
        />
      </form>
    </div>
  );
}
