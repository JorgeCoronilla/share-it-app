'use server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { addGroup } from './data';
import { createClient, Client, Row } from '@libsql/client';

let client: Client | undefined;

if (process.env.DB_URL && process.env.DB_AUTH_TOKEN) {
  client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_AUTH_TOKEN,
  });
} else {
  console.error('DB credentials not found');
}

const CreateGroupSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
});

const CreateTransactionSchema = z.object({
  userId: z.string().uuid(),
  groupId: z.string().uuid(),
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  amount: z.coerce.number().min(0.01),
  date: z.date(),
});

const CreateGroupFormSchema = CreateGroupSchema.omit({
  userId: true,
});

export async function createGroup(formData: FormData) {
  console.log(formData);
  const { name, description } = CreateGroupFormSchema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  const groupId = randomUUID();
  console.log(name, description, groupId);
  const res = await addGroup();
  console.log(res);
  if (!client) {
    throw new Error('DB client not initialized: Wrong credentials');
  }
  try {
    const newGroup = await client.execute({
      sql: 'INSERT INTO groups (group_id, group_name, group_icon, group_info, group_balance) VALUES (?, ?, ?, ? ,0)',
      args: ['uuid5G', name, 'garden_icon', description],
    });
    console.log(newGroup);

    return newGroup;
  } catch (e) {
    console.error('Este error=', e);
  }
}
