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
