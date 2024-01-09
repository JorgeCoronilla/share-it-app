'use server';
import { Row } from '@libsql/client';
import client from '../db/db';

export const getAllFriends = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }

  try {
    const friends = await client.execute({
      sql: 'SELECT u.user_id, u.avatar AS user_avatar, u.username AS user_name, u.email AS email,  GROUP_CONCAT(DISTINCT ug.group_id) AS shared_groups_ids, GROUP_CONCAT(DISTINCT g.group_name) AS shared_groups_names FROM users u JOIN user_group ug ON u.user_id = ug.user_id JOIN groups g ON ug.group_id = g.group_id WHERE ug.group_id IN (SELECT group_id FROM user_group WHERE user_id = ?) AND u.user_id != ? GROUP BY u.user_id HAVING COUNT(DISTINCT ug.group_id) = (SELECT COUNT(DISTINCT group_id) FROM user_group WHERE user_id = ?)',
      args: [user, user, user],
    });
    console.log('Getting all friends', friends.rows);
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
