import { createClient } from '@libsql/client';

export const getGroups = async (user: string) => {
  if (typeof process.env.DB_URL === 'string') {
    const client = createClient({
      url: process.env.DB_URL,
      authToken: process.env.DB_AUTH_TOKEN,
    });

    try {
      const groups = await client.execute({
        sql: 'SELECT * FROM user_group WHERE user_id = ?',
        args: [user],
      });

      console.log(groups.rows);
      if (groups.rows.length === 0) {
        return [];
      }

      const groupsInfo = await client.execute({
        sql: 'SELECT groups.group_id, groups.group_name, transactions.id, transactions.date, transactions.name AS transaction_name, transactions.amount, transactions.icon FROM user_group  JOIN groups ON user_group.group_id = groups.group_id JOIN transactions ON user_group.group_id = transactions.group_id WHERE user_group.user_id = ?',
        args: [user],
      });

      console.log(groupsInfo.rows);
      return groupsInfo.rows;
    } catch (e) {
      console.error(e);
    }
  }
};
