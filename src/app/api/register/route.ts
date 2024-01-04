import client from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data: userRegister = await request.json();
    console.log(data);

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
    if (userFound.rows[0]) {
      console.log({ message: 'user already exists' });
      return NextResponse.json(
        { message: 'user already exists' },
        { status: 400 }
      );
    }
    let user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    var newUser = await client.execute({
      sql: 'INSERT INTO users (user_id, username, email, pass, avatar) VALUES (?, ?, ?, ? ,?)',
      args: [user_id, data.name, data.email, hashedPassword, 'avatar'],
    });
    console.log(newUser);
    return NextResponse.json(
      { message: 'User registered successfully' },
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
