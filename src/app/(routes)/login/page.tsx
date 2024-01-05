'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLogged = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Weeee', userLogged);

    if (userLogged.ok) {
      const data = await userLogged.json();
      router.push(`/dashboard`);
    } else {
      console.log('Error', userLogged.status);
      setShowError(true);
    }
  };
  return (
    <div className="loginForm">
      <form
        className="login-form"
        onSubmit={submit}
      >
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={getData}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={getData}
        />
        {showError && <p style={{ color: 'red' }}>User not found</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
