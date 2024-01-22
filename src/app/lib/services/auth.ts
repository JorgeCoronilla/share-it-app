export async function postUser({ name, email, password }: userRegister) {
  return await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function loginUser({ email, password }: userLogin) {
  return await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function registerUser(token: string) {
  return await fetch('/api/register/confirmation', {
    method: 'POST',
    body: JSON.stringify({
      token,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function registerUserFromInvitation(data: {
  name: string;
  email: string;
  password: string;
  token: string;
}) {
  return await fetch('/api/register/invitation', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
