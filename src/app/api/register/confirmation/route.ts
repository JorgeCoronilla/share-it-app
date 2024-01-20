import { NextRequest, NextResponse } from 'next/server';
import client from '@/app/lib/db/db';
import { v4 as uuidv4 } from 'uuid';
import { getTokenInfo, verifyJwtToken } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const data: { token: string } = await request.json();

    if (!data) {
      return NextResponse.json(
        { message: 'Please add all required info' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }
    // Gets user data from token
    const userData = await getTokenInfo(data.token);
    console.log('userData', userData);
    if (!userData) {
      console.log('Token not found or invalid');
      return NextResponse.json(
        { message: 'Token not found or invalid' },
        { status: 400 }
      );
    }
    // Checks new user from preregistration table
    const preRegisterInfo = await client.execute({
      sql: 'SELECT user_id, username, email, pass, avatar FROM temporal_users WHERE email =  ?',
      args: [userData.email],
    });
    if (preRegisterInfo.rows.length === 0) {
      console.log('User not found in pre-register list', preRegisterInfo);
      return NextResponse.json(
        { message: 'User not found in pre-register list' },
        { status: 404 }
      );
    }
    console.log('User found in pre-registration ', preRegisterInfo);

    // // Creates new ID
    // let user_id = await uuidv4();

    // // Checks if user already exists
    // var userFound = await client.execute({
    //   sql: 'SELECT * FROM users WHERE email = ?',
    //   args: [userData.email],
    // });
    // if (userFound.rows[0]) {
    //   console.log({ message: 'user already exists' });
    //   return NextResponse.json(
    //     { message: 'user already exists' },
    //     { status: 400 }
    //   );
    // }

    // // Inserts new user in users table
    // const newUser = await client.execute({
    //   sql: 'INSERT INTO users (user_id, username, email, pass, avatar) VALUES (?, ?, ?, ? ,?)',
    //   args: [
    //     user_id,
    //     preRegisterInfo.rows[0].username,
    //     preRegisterInfo.rows[0].email,
    //     preRegisterInfo.rows[0].pass,
    //     preRegisterInfo.rows[0].avatar,
    //   ],
    // });
    // console.log('User inserted', newUser);
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
