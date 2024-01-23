import { NextRequest, NextResponse } from 'next/server';
import client from '@/app/lib/db/db';
import { v4 as uuidv4 } from 'uuid';
import { sendInvitaionMail } from '@/app/lib/services/mailService';

export async function POST(request: NextRequest) {
  try {
    const data: NewFriendPetition = await request.json();

    if (!data.group_name || !data.email || !data.hostName) {
      return NextResponse.json(
        { message: 'Please add all required info' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }

    // Checks if group exists and gets ID balance
    const groupId = await client.execute({
      sql: 'SELECT group_id FROM groups WHERE group_name = ?',
      args: [data.group_name],
    });
    if (groupId.rows.length === 0) {
      console.log('Group not found');
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }
    console.log('group exists = ', groupId.rows[0].group_id);

    // Checks if friend exists and gets IDs and name
    const friend = await client.execute({
      sql: 'SELECT user_id, username FROM users WHERE email = ?',
      args: [data.email],
    });
    if (friend.rows.length === 0) {
      console.log('User not registered');
      const sendInvitationEmail = await sendInvitaionMail({
        toEmail: data.email,
        hostName: data.hostName,
        groupId: String(groupId.rows[0].group_id),
        groupName: data.group_name,
      });
      console.log(sendInvitationEmail);

      if (sendInvitationEmail.error) {
        return NextResponse.json(
          { message: 'Email not sent' },
          { status: 503 }
        );
      }
      return NextResponse.json({ message: 'Email sent' }, { status: 201 });
    }
    console.log('Es ususario', friend.rows[0].user_id);

    // Checks if friend is member of the group and gets IDs and name
    const alreadyIn = await client.execute({
      sql: 'SELECT user_group_id FROM user_group WHERE user_id = ? AND group_id = ?',
      args: [friend.rows[0].user_id, groupId.rows[0].group_id],
    });
    if (alreadyIn.rows.length > 0) {
      console.log('Friend Already in that group');
      return NextResponse.json(
        { message: 'Friend Already in that group' },
        { status: 404 }
      );
    }
    console.log('No estaba en el grupo', friend);

    const user_group_id = uuidv4();
    // Join friend to group
    const newMember = await client.execute({
      sql: 'INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES ( ?, ?, ?, ?, ?)',
      args: [
        user_group_id,
        friend.rows[0].user_id,
        groupId.rows[0].group_id,
        0,
        'joined',
      ],
    });

    console.log('newMember', newMember);

    return NextResponse.json(
      {
        message: 'Friend added to group',
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
