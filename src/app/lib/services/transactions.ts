'use server';
import { Row } from '@libsql/client';
import client from '../db/db';

export const getTransactions = async (group: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }

  try {
    const transactions = await client.execute({
      sql: 'SELECT t.transaction_id, t.group_id, t.user_id, t.date, t.description, t.amount, t.transaction_icon, u.username AS user_name, g.group_name FROM transactions t LEFT JOIN users u ON t.user_id = u.user_id LEFT JOIN groups g ON t.group_id = g.group_id WHERE t.group_id =  ?',
      args: [group],
    });

    if (transactions.rows.length === 0) {
      return null;
    }

    let groupData: TransactionsData[] | null = null;
    groupData = transactions.rows.map((row: Row) => {
      const id = row.transaction_id as string;
      const group_id = row.group_id as string;
      const user_id = row.user_id as string;
      const date = row.date as string;
      const description = row.description as string;
      const amount = row.amount as number;
      const icon = row.transaction_icon as string;
      const user_name = row.user_name as string;
      const group_name = row.group_name as string;
      return {
        id,
        group_id,
        group_name,
        user_id,
        user_name,
        date,
        description,
        amount,
        icon,
      };
    });

    return groupData;
  } catch (e) {
    console.error(e);
  }
};
