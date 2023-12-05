type GroupData = {
  id: string;
  name: string;
  icon: string;
  info: string;
  balance: number;
  members: number;
  group_balance: number;
  userDebt: number;
};

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
