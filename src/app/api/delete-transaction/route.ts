import { getUserId } from '@/app/lib/auth';
import client from '@/app/lib/db/db';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const transactionId = request.nextUrl.searchParams.get('transaction');
    const groupId = request.nextUrl.searchParams.get('group');
    var transactionQuantity = request.nextUrl.searchParams.get('quantity');
    if (!transactionQuantity || !groupId || !transactionId) {
      return NextResponse.json(
        {
          message: 'Missing data',
        },
        { status: 400 }
      );
    }
    var currentTransactionAmount = parseFloat(transactionQuantity);

    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }
    // Checks if group exists and gets current group balance
    const currentGroup = await client.execute({
      sql: 'SELECT group_balance FROM groups WHERE group_id = ?',
      args: [groupId],
    });
    if (currentGroup.rows.length === 0) {
      console.log('Group not found');
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    if (!currentGroup.rows[0].group_balance) {
      return NextResponse.json(
        { message: 'Group balance not found' },
        { status: 404 }
      );
    }
    const groupBalance = parseFloat(
      currentGroup.rows[0].group_balance.toString()
    );
    // console.log('groupBalance', groupBalance);
    const userID = await getUserId();
    // Gets user balance in the group
    const currentUserBalance = await client.execute({
      sql: 'SELECT user_balance FROM user_group WHERE user_id = ? AND group_id = ?',
      args: [userID, groupId],
    });

    if (!currentUserBalance.rows[0].user_balance) {
      return NextResponse.json(
        { message: 'User balance not found' },
        { status: 404 }
      );
    }

    const userBalance = parseFloat(
      currentUserBalance.rows[0].user_balance.toString()
    );
    // console.log(userBalance);
    // console.log('transactionQuantity', transactionQuantity);

    const newUserBalance =
      Math.round((userBalance - currentTransactionAmount) * 100) / 100;
    const newGroupBalance =
      Math.round((groupBalance - currentTransactionAmount) * 100) / 100;

    // console.log('newGroupBalance', newGroupBalance);

    // console.log('newUSerBalance', newUserBalance);
    const transaction = await client.transaction('write');

    //Update group balance in user_group table
    const updateGroupBalance = await transaction.execute({
      sql: 'UPDATE groups SET group_balance = ? WHERE group_id = ?',
      args: [newGroupBalance, groupId],
    });
    console.log(updateGroupBalance);
    //Update user balance in user_group table
    const updateUserBalance = await transaction.execute({
      sql: 'UPDATE user_group SET user_balance = ? WHERE group_id = ? AND user_id = ?',
      args: [newUserBalance, groupId, userID],
    });
    console.log(updateUserBalance);

    // Delete trabnsaction from transactions table
    const deleteTransactions = await transaction.execute({
      sql: 'DELETE FROM transactions WHERE transaction_id = ?',
      args: [transactionId],
    });
    console.log('Transaction deletion', deleteTransactions);
    await transaction.commit();
    revalidatePath(`/dashboard/${groupId}`);
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
