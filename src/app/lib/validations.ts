import { z } from 'zod';
export const CreateGroupSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  icon: z.string().min(3).max(50),
});

export const CreateTransactionSchema = z.object({
  userId: z.string().uuid(),
  groupId: z.string().uuid(),
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  amount: z.coerce.number().min(0.01),
  date: z.date(),
});

export const CreateGroupFormSchema = CreateGroupSchema.omit({
  userId: true,
});
