'use server';
import { Row } from '@libsql/client';
import client from '../db';

export const getUser = async (userId: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  try {
    const user = await client.execute({
      sql: 'SELECT * FROM users WHERE user_id = ?',
      args: [userId],
    });

    if (user.rows.length === 0) {
      return null;
    }

    const firstUserRow = user.rows[0]; // Get the first row directly
    const userData: User = {
      id: firstUserRow.user_id as string,
      name: firstUserRow.username as string,
      email: firstUserRow.email as string,
      avatar: firstUserRow.avatar as string,
    };

    return userData;
  } catch (e) {
    console.error(e);
  }
};

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
