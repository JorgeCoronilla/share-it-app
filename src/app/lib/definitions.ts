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
