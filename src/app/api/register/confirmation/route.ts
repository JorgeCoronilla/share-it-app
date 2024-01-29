import { NextRequest, NextResponse } from 'next/server';
import client from '@/app/lib/db/db';
import { v4 as uuidv4 } from 'uuid';
import { getJwtSecretKey, getTokenInfo } from '@/app/lib/auth';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

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
    console.log('preRegisterInfo', preRegisterInfo);
    if (preRegisterInfo.rows.length === 0) {
      console.log('User not found in pre-register list', preRegisterInfo);
      return NextResponse.json(
        { message: 'User not found in pre-register list' },
        { status: 404 }
      );
    }
    console.log('User found in pre-registration ', preRegisterInfo.rows[0]);

    // Creates new ID
    let user_id = await uuidv4();

    // Checks if user already exists
    var userFound = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [userData.email.toLowerCase()],
    });
    if (userFound.rows[0]) {
      console.log({ message: 'user already exists' });
      return NextResponse.json(
        { message: 'user already exists' },
        { status: 401 }
      );
    }

    // Inserts new user in users table

    if (!preRegisterInfo.rows[0].pass) {
      console.log('Password not found');
      return NextResponse.json(
        { message: 'Password not found' },
        { status: 404 }
      );
    }

    if (!preRegisterInfo.rows[0].email) {
      console.log('Password not found');
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    const newUser = await client.execute({
      sql: 'INSERT INTO users (user_id, username, email, pass, avatar) VALUES (?, ?, ?, ? ,?)',
      args: [
        user_id,
        preRegisterInfo.rows[0].username,
        preRegisterInfo.rows[0].email.toString().toLowerCase(),
        preRegisterInfo.rows[0].pass.toString(),
        preRegisterInfo.rows[0].avatar,
      ],
    });
    console.log('User inserted', newUser);

    const token = await new SignJWT({
      id: user_id,
      email: preRegisterInfo.rows[0].email.toString().toLowerCase(),
      name: preRegisterInfo.rows[0].username,
      avatar: preRegisterInfo.rows[0].avatar,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1day')
      .sign(getJwtSecretKey());
    console.log(token);
    const serialiazed = serialize('access-token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 60 * 60 * 24,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    cookies().set('access-token', serialiazed);
    console.log('Logged successfully');

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
