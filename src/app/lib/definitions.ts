interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Friend extends User {
  groups_ids: string[];
  groups_names: string[];
}

interface GroupData {
  id: string;
  name: string;
  icon: string;
  info: string;
  balance: number;
  members: number;
  group_balance: number;
  userDebt: number;
}

interface TransactionsData {
  id: string;
  group_id: string;
  user_id: string;
  group_name: string;
  user_name: string;
  date: string;
  description: string;
  amount: number;
  icon: string;
}

interface Activity {
  id: string;
  group_id: string;
  user_id: string;
  date: string;
  description: string;
  amount: number;
  icon: string;
  user_name: string;
  group_name: string;
}

interface userLogin {
  email: string;
  password: string;
}

interface userRegister {
  name: string;
  email: string;
  password: string;
}

interface validateRegister {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  all: boolean;
}

interface Register {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface InitialMessageState {
  message: boolean;
  display: boolean;
}

interface NewExpenseData {
  group: string;
  description: string;
  quantity: string;
  icon: string;
  groupId?: string;
}

interface NewGroupData {
  name: string;
  description: string;
  icon: string;
  groupId?: string;
}
