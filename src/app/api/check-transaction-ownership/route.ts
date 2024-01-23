import { NextRequest, NextResponse } from 'next/server';
import { getUserId } from '@/app/lib/auth';
import client from '@/app/lib/db/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: 'Please all required info' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }

    //Gets user ID and generates new ID's
    const userID = await getUserId();

    // Checks if there is already a group with same name
    const checkTransaction = await client.execute({
      sql: 'SELECT * FROM transactions WHERE user_id = ? AND transaction_id = ?',
      args: [userID, data],
    });
    console.log(checkTransaction.rows[0]);

    if (checkTransaction.rows.length === 0) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Transaction belongs to user',
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
