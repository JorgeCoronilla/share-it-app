'use server';
import { Row } from '@libsql/client';
import client from '../db/db';

export const getGroups = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  try {
    const groups = await client.execute({
      sql: 'SELECT g.group_id, g.group_name, g.group_icon, g.group_info, g.group_balance, ug.user_balance, user_count.member_count FROM groups g JOIN user_group ug ON g.group_id = ug.group_id LEFT JOIN (SELECT group_id, COUNT(DISTINCT user_id) AS member_count FROM user_group GROUP BY group_id) AS user_count ON g.group_id = user_count.group_id WHERE ug.user_id =?',
      args: [user],
    });

    if (groups.rows.length === 0) {
      return null;
    }
    let userData: GroupData[] | null = null;
    userData = groups.rows.map((row: Row) => {
      const id = row.group_id as string;
      const name = row.group_name as string;
      const icon = row.group_icon as string;
      const info = row.group_info as string;
      const group_balance = row.group_balance as number;
      const balance = row.user_balance as number;
      const members = row.member_count as number;
      const userDebt = group_balance / members - balance; // Calculate user's debt

      return {
        id,
        name,
        icon,
        info,
        balance,
        members,
        group_balance,
        userDebt: userDebt as number,
      };
    });

    return userData;
  } catch (e) {
    console.error(e);
  }
};
