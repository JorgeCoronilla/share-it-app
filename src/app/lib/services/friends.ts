'use server';
import client from '../db/db';

export const getAllFriends = async (user: string) => {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  console.log('Getting all friends', user);
  try {
    const friendsData = await client.execute({
      sql: `
        SELECT
          ug.group_id,
          ug.user_id AS shared_user_id,
          u.username AS shared_user_name
        FROM
          user_group ug
        JOIN
          users u ON ug.user_id = u.user_id
        WHERE
          ug.group_id IN (SELECT group_id FROM user_group WHERE user_id = ?) 
          AND u.user_id != ?;
      `,
      args: [user, user],
    });

    var friendsList = [];
    if (friendsData.rows.length === 0) {
      return null;
    }

    for (const row of friendsData.rows) {
      const groupId = row.group_id as string;
      const sharedUserId = row.shared_user_id as string;
      const sharedUserName = row.shared_user_name as string;

      // Fetch the real group name using the group ID
      const realGroupNames = await client.execute({
        sql: 'SELECT group_name FROM groups WHERE group_id = ?',
        args: [groupId],
      });

      const groups_names: string[] = realGroupNames.rows.map(
        (row: any) => row.group_name
      );

      friendsList.push({
        id: sharedUserId,
        name: sharedUserName,
        email: '',
        avatar: '',
        groups_names: groups_names,
        groups_ids: [groupId],
      });
    }

    let shortedFriendsList: Friend[] = [];
    let indexFlag = 0;

    friendsList.forEach((friend, index) => {
      if (shortedFriendsList.length === 0) {
        shortedFriendsList.push({
          id: friend.id,
          name: friend.name,
          email: friend.email,
          avatar: friend.avatar,
          groups_names: friend.groups_names,
          groups_ids: friend.groups_ids,
        });
        indexFlag++;
      } else {
        if (shortedFriendsList[indexFlag - 1]?.id === friend.id) {
          shortedFriendsList[indexFlag - 1].groups_names.push(
            ...friend.groups_names
          );
          shortedFriendsList[indexFlag - 1].groups_ids.push(
            ...friend.groups_ids
          );
        } else {
          shortedFriendsList.push({
            id: friend.id,
            name: friend.name,
            email: friend.email,
            avatar: friend.avatar,
            groups_names: friend.groups_names,
            groups_ids: friend.groups_ids,
          });
          indexFlag++;
        }
      }
    });
    console.log('Friends list', shortedFriendsList);
    return shortedFriendsList;
  } catch (e) {
    console.error(e);
  }
};
