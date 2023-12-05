import { createClient, Client, Row } from '@libsql/client';

let client: Client | undefined;

if (process.env.DB_URL && process.env.DB_AUTH_TOKEN) {
  client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_AUTH_TOKEN,
  });
} else {
  console.error('DB credentials not found');
}

export const getUser = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
};

export const getGroups = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }

  try {
    const groups = await client.execute({
      sql: 'SELECT g.group_id, g.group_name, g.group_icon, g.group_info, ug.user_balance  FROM groups g JOIN user_group ug ON g.group_id = ug.group_id WHERE ug.user_id = ?',
      args: [user],
    });

    if (groups.rows.length === 0) {
      return null;
    }

    let userData: GroupData[] | null = null;
    userData = groups.rows.map((row: Row) => ({
      id: row.group_id as string,
      name: row.group_name as string,
      icon: row.group_icon as string,
      balance: row.user_balance as number,
    }));
    return userData;
  } catch (e) {
    console.error(e);
  }
};
