'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import client from '../db/db';
import { CreateGroupFormSchema } from '../validations';
import { getUserId } from '../auth';

export async function createGroup(
  prevState: InitialMessageState,
  formData: FormData
): Promise<InitialMessageState> {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  let transaction; // Declare the transaction variable here
  try {
    const { name, description, icon } = CreateGroupFormSchema.parse({
      name: formData.get('name'),
      description: formData.get('description'),
      icon: formData.get('icon'),
    });

    const userId = prevState.user;
    const groupId = randomUUID();
    console.log(name, description, groupId, icon);
    const groupUserId = randomUUID();

    // Starts transaction
    transaction = await client.transaction('write');

    const newGroup = await transaction.execute({
      sql: 'INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES (?, ?, ?, ? ,0)',
      args: [groupId, name, icon, description],
    });
    console.log(newGroup);

    // Second query
    const userGroup = await transaction.execute({
      sql: 'INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES (?, ?, ?, ?, ?)',
      args: [groupUserId, userId, groupId, 0, 'active'],
    });
    console.log(userGroup);

    // Commit the transaction if both insertions were successful
    await transaction.commit();
    revalidatePath('/dashboard');

    return { message: true, display: true, user: prevState.user };
  } catch (e) {
    console.error('Writing db error', e);
    // If an error occurs, rollback the transaction to revert changes
    if (transaction) {
      await transaction.rollback();
    }

    return { message: false, display: true, user: prevState.user };
  }
}

export async function createExpense(
  prevState: InitialMessageState,
  formData: FormData
): Promise<InitialMessageState> {
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  const userID = await getUserId();
  try {
    const data = {
      group: formData.get('group')?.toString(),
      description: formData.get('description')?.toString(),
      quantity: formData.get('quantity')?.toString(),
      icon: formData.get('icon')?.toString(),
    };

    const expenseId = randomUUID();
    const date = new Date();
    console.log(data.group, data.description, data.quantity, data.icon);
    if (!data.group || !data.description || !data.quantity || !data.icon) {
      return { message: true, display: true, user: prevState.user };
    }

    // Checks if group exists
    const groupId = await client.execute({
      sql: 'SELECT group_id FROM groups WHERE group_name = ?',
      args: [data.group],
    });
    console.log(groupId.rows[0].group_id);
    console.log(
      expenseId,
      groupId.rows[0].group_id,
      userID,
      date,
      data.description,
      data.quantity,
      data.icon
    );
    const newExpense = await client.execute({
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
    console.log(newExpense);

    // // Second query
    // const userGroup = await transaction.execute({
    //   sql: 'INSERT INTO user_group (user_group_id, user_id, group_id, user_balance, status) VALUES (?, ?, ?, ?, ?)',
    //   args: [groupUserId, userId, groupId, 0, 'active'],
    // });
    // console.log(userGroup);

    // // Commit the transaction if both insertions were successful
    // await transaction.commit();
    // revalidatePath('/dashboard');

    return { message: true, display: true, user: prevState.user };
  } catch (e) {
    console.error('Writing db error', e);
    // If an error occurs, rollback the transaction to revert changes
    // if (transaction) {
    //   await transaction.rollback();
    // }

    return { message: false, display: true, user: prevState.user };
  }
}
