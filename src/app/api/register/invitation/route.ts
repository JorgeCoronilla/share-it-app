import { NextRequest, NextResponse } from 'next/server';
import client from '@/app/lib/db/db';
import { v4 as uuidv4 } from 'uuid';
import { getTokenInfo2 } from '@/app/lib/auth';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: 'Please add all required info' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }
    //Gets user data from token
    const { groupId, email } = await getTokenInfo2(data.token);
    console.log('userData', groupId, email);
    if (!groupId || !email) {
      console.log('Token not found or invalid');
      return NextResponse.json(
        { message: 'Token not found or invalid' },
        { status: 400 }
      );
    }

    // Checks if user already exists
    var userFound = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [data.email],
    });
    if (userFound.rows[0]) {
      console.log({ message: 'user already exists' });
      return NextResponse.json(
        { message: 'user already exists' },
        { status: 404 }
      );
    }
    console.log('good: user not found');
    // Inserts new user in users table
    // Creates new ID
    let user_id = await uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await client.execute({
      sql: 'INSERT INTO users (user_id, username, email, pass, avatar) VALUES (?, ?, ?, ? ,?)',
      args: [user_id, data.name, email, hashedPassword, 'avatar'],
    });
    console.log('User inserted', newUser);

    // Checks if group exists and gets IDs and current balance
    const group = await client.execute({
      sql: 'SELECT group_id FROM groups WHERE group_id = ?',
      args: [groupId],
    });
    if (group.rows.length === 0) {
      console.log('Group not found');
      return NextResponse.json({ message: 'Group not found' }, { status: 400 });
    }
    console.log('good: group exists = ', group.rows[0].group_id);

    const user_group_id = uuidv4();
    // Join friend to group
    const newMember = await client.execute({
      sql: 'INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ( ?, ?, ?, ?, ?)',
      args: [user_group_id, user_id, groupId, 0, 'invited'],
    });
    console.log('newMember: user joined into group', newMember);

    return NextResponse.json(
      {
        message: 'User inserted to group',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
