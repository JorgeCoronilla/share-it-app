import { NextRequest, NextResponse } from 'next/server';
import { getUserId } from '@/app/lib/auth';
import client from '@/app/lib/db/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data: NewExpenseData = await request.json();

    if (!data.group || !data.description || !data.quantity || !data.icon) {
      return NextResponse.json(
        { message: 'Please add all required info' },
        { status: 400 }
      );
    }
    if (!client) {
      throw new Error('DB client not initialized: Wrong credentials');
    }

    // Checks if group exists and gets IDs and current balance
    const groupId = await client.execute({
      sql: 'SELECT group_id, group_balance FROM groups WHERE group_name = ?',
      args: [data.group],
    });
    if (groupId.rows.length === 0) {
      console.log('Group not found');
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }
    console.log(groupId);

    //Starts transaction to add expense
    const userID = await getUserId();
    const expenseId = uuidv4();

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    const transaction = await client.transaction('write');

    const newExpense = await transaction.execute({
      sql: 'INSERT INTO transactions (transaction_id, group_id, user_id, date, description, amount, transaction_icon) VALUES ( ?, ?, ?, ?, ?,?,?)',
      args: [
        expenseId,
        groupId.rows[0].group_id,
        userID,
        date,
        data.description,
        data.quantity,
        data.icon,
      ],
    });

    console.log('newExpense', newExpense);
    var newBalance;
    if (groupId.rows[0].group_balance || groupId.rows[0].group_balance === 0) {
      newBalance = parseFloat(
        (
          parseFloat(groupId.rows[0].group_balance.toString()) +
          parseFloat(data.quantity)
        ).toFixed(2)
      );
      const updateGroupBalance = await transaction.execute({
        sql: 'UPDATE groups SET group_balance = ? WHERE group_id = ?',
        args: [newBalance, groupId.rows[0].group_id],
      });
      console.log('updateGroupBalance: ', updateGroupBalance.rows[0]);
    }

    const currentUserBalance = await transaction.execute({
      sql: 'SELECT user_balance FROM user_group WHERE user_id = ? AND group_id = ?',
      args: [userID, groupId.rows[0].group_id],
    });

    var newUserBalance = 0;
    if (
      currentUserBalance.rows[0].user_balance ||
      currentUserBalance.rows[0].user_balance === 0
    ) {
      newUserBalance =
        parseFloat(currentUserBalance.rows[0].user_balance.toString()) +
        parseFloat(data.quantity);
    }
    const roundedBalance = parseFloat(newUserBalance.toFixed(2));
    const updateBalance = await transaction.execute({
      sql: 'UPDATE user_group SET user_balance = ? WHERE user_id = ? AND group_id = ?',
      args: [roundedBalance, userID, groupId.rows[0].group_id],
    });

    console.log('updateBalance: ', updateBalance.rows[0]);

    // Commit the transaction if both insertions were successful
    await transaction.commit();

    return NextResponse.json(
      {
        message: 'Expense added',
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
