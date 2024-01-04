'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const [login, setLogin] = useState({ name: '', email: '', password: '' });
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    console.log(login);
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

    console.log(userLogged);
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
        <label>Confirm password</label>
        <input
          type="password"
          name="password"
          onChange={getData}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
