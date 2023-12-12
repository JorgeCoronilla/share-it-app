'use server';
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

export const getAllFriends = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }

  try {
    const friends = await client.execute({
      sql: 'SELECT u.user_id, u.avatar AS user_avatar, u.username AS user_name, u.email AS email,  GROUP_CONCAT(DISTINCT ug.group_id) AS shared_groups_ids, GROUP_CONCAT(DISTINCT g.group_name) AS shared_groups_names FROM users u JOIN user_group ug ON u.user_id = ug.user_id JOIN groups g ON ug.group_id = g.group_id WHERE ug.group_id IN (SELECT group_id FROM user_group WHERE user_id = ?) AND u.user_id != ? GROUP BY u.user_id HAVING COUNT(DISTINCT ug.group_id) = (SELECT COUNT(DISTINCT group_id) FROM user_group WHERE user_id = ?)',
      args: [user, user, user],
    });

    if (friends.rows.length === 0) {
      return null;
    }

    let friendsList: Friend[] | null = null;
    friendsList = friends.rows.map((row: Row) => {
      const id = row.user_id as string;
      const name = row.user_name as string;
      const email = row.email as string;
      const avatar = row.user_avatar as string;
      const groups_ids = (row.shared_groups_ids as string)
        ? (row.shared_groups_ids as string).split(',')
        : [];
      const groups_names = (row.shared_groups_names as string)
        ? (row.shared_groups_names as string).split(',')
        : [];

      return {
        id,
        name,
        email,
        avatar,
        groups_ids,
        groups_names,
      };
    });

    return friendsList;
  } catch (e) {
    console.error(e);
  }
};

export const getGroups = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  // const userData = [
  //   {
  //     id: 'uuid1G',
  //     name: 'Casa',
  //     icon: 'house_icon',
  //     info: 'Gastos de la casa',
  //     balance: 79.49,
  //     members: 2,
  //     group_balance: 153.98,
  //     userDebt: -2.5,
  //   },
  //   {
  //     id: 'uuid3G',
  //     name: 'Compras',
  //     icon: 'shopping_icon',
  //     info: 'Super y demás',
  //     balance: 0,
  //     members: 2,
  //     group_balance: 0,
  //     userDebt: 0,
  //   },
  //   {
  //     id: 'uuid4G',
  //     name: 'Vacaciones',
  //     icon: 'plane_icon',
  //     info: 'Viajecitos y escapadas',
  //     balance: 0,
  //     members: 2,
  //     group_balance: 0,
  //     userDebt: 0,
  //   },
  //   {
  //     id: 'uuid2G',
  //     name: 'Coche',
  //     icon: 'car_icon',
  //     info: 'Cositas del coche',
  //     balance: 74.49,
  //     members: 2,
  //     group_balance: 153.98,
  //     userDebt: 2.5,
  //   },
  // ];
  // return userData;
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

export const getActivity = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }

  try {
    const activity = await client.execute({
      sql: 'SELECT t.transaction_id, t.group_id, t.user_id, t.date, t.description, t.amount, t.transaction_icon, u.username AS user_name, g.group_name FROM transactions t LEFT JOIN users u ON t.user_id = u.user_id LEFT JOIN groups g ON t.group_id = g.group_id WHERE t.group_id IN (SELECT DISTINCT group_id FROM user_group WHERE user_id = ?) ORDER BY t.date DESC',
      args: [user],
    });

    if (activity.rows.length === 0) {
      return null;
    }

    let activityData: Activity[] | null = null;
    activityData = activity.rows.map((row: Row) => {
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

    return activityData;
  } catch (e) {
    console.error(e);
  }
};
