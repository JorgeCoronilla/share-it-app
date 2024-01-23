import { getUserId } from '@/app/lib/auth';
import client from '@/app/lib/db/db';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const {
      icon,
      description,
      groupId,
      transactionId,
      oldQuantity,
      newQuantity,
    } = await request.json();

    if (
      !description ||
      !icon ||
      !groupId ||
      !transactionId ||
      !oldQuantity ||
      !newQuantity
    ) {
      return NextResponse.json(
        {
          message: 'Missing data',
        },
        { status: 400 }
      );
    }
    var oldAmount = parseFloat(oldQuantity);
    var newAmount = parseFloat(newQuantity);
    console.log('oldAmount', oldAmount);
    console.log('newAmount', newAmount);

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
    console.log('groupBalance', groupBalance);
    const userID = await getUserId();
    // Gets user balance in the group
    const currentUserBalance = await client.execute({
      sql: 'SELECT user_balance FROM user_group WHERE user_id = ? AND group_id = ?',
      args: [userID, groupId],
    });
    console.log('currentUserBalance', currentUserBalance.rows[0].user_balance);
    const userBalance = currentUserBalance.rows[0].user_balance;
    console.log('userBalance', userBalance);
    if (!userBalance) {
      return NextResponse.json(
        { message: 'User balance not found' },
        { status: 404 }
      );
    }

    const newUserBalance =
      parseFloat(userBalance.toString()) - oldAmount + newAmount;

    const newGroupBalance = groupBalance - oldAmount + newAmount;

    console.log('newGroupBalance', newGroupBalance);
    console.log('newUSerBalance', newUserBalance);
    const transaction = await client.transaction('write');

    //Update group balance in groupd table
    const updateGroupBalance = await transaction.execute({
      sql: 'UPDATE groups SET group_balance = ? WHERE group_id = ?',
      args: [newGroupBalance, groupId],
    });
    console.log('updateGroupBalance', updateGroupBalance);
    //Update group balance in user_group table
    const updateUserBalance = await transaction.execute({
      sql: 'UPDATE user_group SET user_balance = ? WHERE group_id = ? AND user_id = ?',
      args: [newUserBalance, groupId, userID],
    });
    console.log(updateUserBalance);
    // Update transaction from transactions table
    const updateTransactions = await transaction.execute({
      sql: 'UPDATE transactions SET  amount = ?, description = ?, transaction_icon = ? WHERE transaction_id = ?',
      args: [newQuantity, description, icon, transactionId],
    });
    console.log('Transaction update', updateTransactions);
    await transaction.commit();
    revalidatePath(`/dashboard/${groupId}`);
    revalidatePath(`/dashboards`);
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
