'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [login, setLogin] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const validation_INITIAL_STATE = {
    name: false,
    email: false,
    password: false,
    passwordConfirmation: false,
    allfields: false,
  };
  const [showError, setShowError] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );

  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );
  useEffect(() => {
    setShowError(validate(login));
    console.log(showError);
  }, [login]);
  const router = useRouter();

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    const currentField = {
      ...validation_INITIAL_STATE,
      [name]: true,
    };
    setOnFocus(currentField);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLogged = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        name: login.name,
        email: login.email,
        password: login.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const userLogged = await loginUser(login);

    // if (userLogged.ok) {
    //   const data = await userLogged.json();
    //   router.push(`/dashboard/${data.user.role}`);
    // } else {
    //   console.log('Error', userLogged.status);
    //   setShowError(true);
    // }
  };
  return (
    <div className="loginForm">
      <form
        className="login-form"
        onSubmit={submit}
      >
        <h1>Nuevo usuario</h1>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={getData}
        />
        {showError.name && onFocus.name && (
          <p style={{ color: 'red' }}>Name is not correct</p>
        )}
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={getData}
        />
        {showError.email && onFocus.email && (
          <p style={{ color: 'red' }}>Email is incorrect</p>
        )}
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={getData}
        />
        {showError.password && onFocus.password && (
          <p style={{ color: 'red' }}>Password must be at least 8 characters</p>
        )}
        <label>Confirm password</label>
        <input
          type="password"
          name="passwordConfirmation"
          onChange={getData}
        />
        {showError.passwordConfirmation && onFocus.passwordConfirmation && (
          <p style={{ color: 'red' }}>Passwords do not matchs</p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function validate(values: Register) {
  // Regular expressions
  const regexTwoCharacters = /^(?![\s]{2,})[a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,50}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return {
    name: !regexTwoCharacters.test(values.name),
    email: !regexEmail.test(values.email),
    password: !regexPassword.test(values.password),
    passwordConfirmation: !(values.password === values.passwordConfirmation),
    allfields: !(
      regexTwoCharacters.test(values.name) &&
      regexEmail.test(values.email) &&
      regexPassword.test(values.password) &&
      values.password === values.passwordConfirmation
    ),
  };
}
