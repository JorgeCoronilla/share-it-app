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
  const result = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await result.json();
  console.log(result.status);
  console.log(res);
  return res;
}
