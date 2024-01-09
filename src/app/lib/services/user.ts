'use server';
import { getUserId } from '../auth';
import client from '../db/db';

export const getUser = async (userId?: string) => {
  if (!userId) {
    userId = await getUserId();
  }
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
