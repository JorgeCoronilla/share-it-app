import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import client from '@/app/lib/db/db';
import { sendConfirmationMail } from '@/app/lib/services/mailService';
import { cleanUpTemporalUsers } from '@/app/lib/services/cleanUpTemporalUsers';

export async function POST(request: NextRequest) {
  try {
    const data: userRegister = await request.json();
    console.log(data);

    if (!data.email || !data.password || !data.name) {
      return NextResponse.json(
        { message: 'Please provide a name, an email and password' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
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
        { status: 400 }
      );
    }

    // Checks if user already exists in pre-registered users
    var userFound = await client.execute({
      sql: 'SELECT * FROM temporal_users WHERE email = ?',
      args: [data.email],
    });
    if (userFound.rows[0]) {
      console.log({ message: 'user already exists' });
      return NextResponse.json(
        { message: 'user already exists' },
        { status: 400 }
      );
    }

    // Creates a new user
    let user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    var newUser = await client.execute({
      sql: 'INSERT INTO temporal_users (user_id, username, email, pass, avatar) VALUES (?, ?, ?, ? ,?)',
      args: [user_id, data.name, data.email, hashedPassword, 'avatar'],
    });
    console.log(newUser);

    // Set up a cleanup task to run every hour
    cleanUpTemporalUsers();

    //Send confirmation email
    const confirmationEmail = await sendConfirmationMail(data.email, data.name);
    console.log(confirmationEmail);

    return NextResponse.json(
      {
        message:
          'User pre-registered successfully. Awaiting for email confirmation',
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
