import { SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import { getJwtSecretKey } from '@/app/lib/auth';
import client from '@/app/lib/db/db';

export async function POST(request: NextRequest) {
  try {
    const data: userLogin = await request.json();
    console.log(data.password);

    if (!data.email || !data.password) {
      return NextResponse.json(
        { message: 'Please provide an email and password' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }
    var userFound = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [data.email],
    });
    console.log(userFound);
    if (userFound.rows.length === 0) {
      console.log('User not found');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (
      userFound.rows.length === 1 &&
      userFound.rows[0].pass !== null &&
      userFound.rows[0].pass !== undefined
    ) {
      console.log('User found');
      const passwordOk = await bcrypt.compare(
        data.password,
        userFound.rows[0].pass.toString()
      );
      console.log(passwordOk);
      if (!passwordOk) {
        console.log('Invalid email or password');
        return NextResponse.json(
          { message: 'Invalid email or password' },
          { status: 400 }
        );
      }
      console.log('Password validation: ', passwordOk);
      console.log('User found: ', userFound.rows[0]);
      const token = await new SignJWT({
        id: userFound.rows[0].user_id,
        email: userFound.rows[0].email,
        name: userFound.rows[0].username,
        avatar: userFound.rows[0].avatar,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(getJwtSecretKey());
      console.log(
        {
          id: userFound.rows[0].user_id,
          email: userFound.rows[0].email,
          name: userFound.rows[0].username,
          avatar: userFound.rows[0].avatar,
        },
        token
      );
      const serialiazed = serialize('access-token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 30 * 60 * 60 * 24 * 30,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
      cookies().set('access-token', serialiazed);
      console.log('Logged successfully');
      return NextResponse.json(
        {
          message: 'Logged',
          user: {
            id: userFound.rows[0].id,
            email: userFound.rows[0].email,
            name: userFound.rows[0].name,
            avatar: userFound.rows[0].avatar,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
