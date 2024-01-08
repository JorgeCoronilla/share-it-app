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

export function validateForm(values: Register) {
  // Regular expressions
  const regexTwoCharacters = /^(?![\s]{2,})[a-zA-ZÀ-ÖØ-öø-ÿ\s]{2,50}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return {
    name: !regexTwoCharacters.test(values.name),
    email: !regexEmail.test(values.email),
    password: !regexPassword.test(values.password),
    passwordConfirmation: !(values.password === values.passwordConfirmation),
    allfields: !(
      regexTwoCharacters.test(values.name) &&
      regexEmail.test(values.email) &&
      regexPassword.test(values.password) &&
      values.password === values.passwordConfirmation
    ),
  };
}
