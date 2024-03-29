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

// Regular expressions
const regexTwoCharacters =
  /^(?! )[\wáéíóúüñÁÉÍÓÚÜÑ.,?!¡¿\s-][\w\dáéíóúüñÁÉÍÓÚÜÑ.,?!¡¿\s-]{0,48}[\wáéíóúüñÁÉÍÓÚÜÑ.,?!¡¿\s-](?! )$/;

const regexDecimalNumber = /^\d+([.,]\d+)?$/;

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validateForm(values: Register) {
  return {
    name: !regexTwoCharacters.test(values.name),
    email: !regexEmail.test(values.email),
    password: !regexPassword.test(values.password),
    confirmPassword: !(values.password === values.confirmPassword),
    allfields: !(
      regexTwoCharacters.test(values.name) &&
      regexEmail.test(values.email) &&
      regexPassword.test(values.password) &&
      values.password === values.confirmPassword
    ),
  };
}

export function validateInvitation(values: Register) {
  return {
    name: !regexTwoCharacters.test(values.name),
    email: !regexEmail.test(values.email),
    password: !regexPassword.test(values.password),
    confirmPassword: !(values.password === values.confirmPassword),
    allfields: !(
      regexTwoCharacters.test(values.name) &&
      regexPassword.test(values.password) &&
      values.password === values.confirmPassword
    ),
  };
}

export function validateLogin(values: userLogin) {
  return {
    email: !regexEmail.test(values.email),
    password: !regexPassword.test(values.password),
    allfields: !(
      regexEmail.test(values.email) && regexPassword.test(values.password)
    ),
  };
}

export function validateAddGroup(values: NewGroupData) {
  return {
    name: !regexTwoCharacters.test(values.name),
    description: !regexTwoCharacters.test(values.description),
    icon: !(values.icon !== ''),
    allfields:
      regexTwoCharacters.test(values.name) &&
      regexTwoCharacters.test(values.description) &&
      values.icon !== '',
  };
}

export function validateNewFriend(values: NewFriend) {
  return {
    group: values.group === '',
    email: !regexEmail.test(values.email),

    allfields: values.group === '' && regexEmail.test(values.email),
  };
}

export function validateNewExpense(values: NewExpenseData) {
  return {
    group: values.group === '',
    description: !regexTwoCharacters.test(values.description),
    quantity: !regexDecimalNumber.test(values.quantity),
    icon: values.icon === '',
    allfields:
      values.group !== '' &&
      regexTwoCharacters.test(values.description) &&
      regexDecimalNumber.test(values.quantity) &&
      values.icon !== '',
  };
}
