'use server';
import { CreateGroupSchema, CreateGroupFormSchema } from './validations';
import { randomUUID } from 'crypto';
import { createClient, Client, Row } from '@libsql/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//Connect db
let client: Client | undefined;

if (process.env.DB_URL && process.env.DB_AUTH_TOKEN) {
  client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_AUTH_TOKEN,
  });
} else {
  console.error('DB credentials not found');
}

export async function createGroup(
  prevState: { message: boolean; display: boolean; user: string },
  formData: FormData
): Promise<{ message: boolean; display: boolean; user: string }> {
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
