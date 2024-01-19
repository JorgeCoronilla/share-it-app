import client from '@/app/lib/db/db';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const groupId = request.nextUrl.searchParams.get('group');

    if (!groupId) {
      return NextResponse.json(
        {
          message: 'Missing group ID',
        },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }

    // Checks if group balance is 0
    const isBalance0 = await client.execute({
      sql: 'SELECT * FROM groups WHERE group_id = ? AND group_balance = 0;',
      args: [groupId],
    });
    if (isBalance0.rows.length === 0) {
      return NextResponse.json(
        { message: 'No es posible borrar este grupo ya que aún hay deudas' },
        { status: 404 }
      );
    }
    console.log('balance is 0', isBalance0.rows);

    const deleteTransactions = await client.execute({
      sql: 'DELETE FROM transactions WHERE group_id = ?',
      args: [groupId],
    });
    console.log('Transactions deletion', deleteTransactions);

    const deleteUserGroupRelation = await client.execute({
      sql: 'DELETE FROM user_group WHERE group_id = ?',
      args: [groupId],
    });
    console.log('User-Group relation deletion', deleteUserGroupRelation);

    const deleteGroup = await client.execute({
      sql: 'DELETE FROM groups WHERE group_id = ?',
      args: [groupId],
    });
    console.log('Group deletion', deleteGroup);
    revalidatePath('/dashboard');
    return NextResponse.json(
      {
        message: 'Friend added to group',
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
