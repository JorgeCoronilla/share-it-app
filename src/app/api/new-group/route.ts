import { NextRequest, NextResponse } from 'next/server';
import { getUserId } from '@/app/lib/auth';
import client from '@/app/lib/db/db';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const data: NewGroupData = await request.json();

    if (!data.name || !data.description || !data.icon) {
      return NextResponse.json(
        { message: 'Please all required info' },
        { status: 400 }
      );
    }
    console.log('API', data);
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }

    //Gets user ID and generates new ID's
    const userID = await getUserId();

    // Checks if there is already a group with same name
    const sameNameGroup = await client.execute({
      sql: 'SELECT group_id FROM groups WHERE group_name = ?',
      args: [data.name],
    });
    if (sameNameGroup.rows.length > 0) {
      console.log('Group already exists');
      return NextResponse.json(
        { message: 'Group already exists' },
        { status: 404 }
      );
    }
    console.log(sameNameGroup.rows[0].group_id);

    const groupId = uuidv4();
    const groupUserId = uuidv4();

    // Starts transaction
    const transaction = await client.transaction('write');

    const newGroup = await transaction.execute({
      sql: 'INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES (?, ?, ?, ? ,0)',
      args: [groupId, data.name, data.icon, data.description],
    });
    console.log('newGroup', newGroup);

    const userGroup = await transaction.execute({
      sql: 'INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES (?, ?, ?, ?, ?)',
      args: [groupUserId, userID, groupId, 0, 'active'],
    });
    console.log(userGroup);

    // Commit the transaction if both insertions were successful
    await transaction.commit();
    revalidatePath('/dashboard');

    return NextResponse.json(
      {
        message: 'Group added',
        data,
      },
      { status: 200 }
    );
    // }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
