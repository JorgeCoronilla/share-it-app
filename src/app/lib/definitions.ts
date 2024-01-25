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

interface validateAddGroup {
  name: boolean;
  description: boolean;
  icon: boolean;
  all: boolean;
}

interface Register {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface InvitationData {
  name: string;
  password: string;
  confirmPassword: string;
}

interface Invitation {
  name: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface ConfirmRegister {
  email: string;
  name: string;
  baseUrl: string;
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

interface Validate_NewExpenseData {
  group: boolean;
  description: boolean;
  quantity: boolean;
  icon: boolean;
  allfields: boolean;
}

interface NewGroupData {
  name: string;
  description: string;
  icon: string;
  groupId?: string;
}

type useAddData =
  | {
      name: string;
      description: string;
      icon: string;
      groupId?: string;
    }
  | {
      group: string;
      description: string;
      quantity: string;
      icon: string;
      groupId?: string;
    };
interface CommonData {
  name: string;
  description: string;
  icon: string;
  groupId?: string;
  group?: string; // Properties from NewExpenseData
  quantity?: string; // Properties from NewExpenseData
}

interface NewFriend {
  email: string;
  group: string;
}

interface NewFriendPetition {
  email: string;
  group_name: string;
  group_id: string;
  hostName: string;
}

interface ValidateNewFriend {
  email: boolean;
  group: boolean;
}

interface getDataObject {
  [key: string]: string;
}

interface validateLogin {
  email: boolean;
  password: boolean;
}
type formTypes =
  | 'login'
  | 'register'
  | 'expenses'
  | 'groups'
  | 'friends'
  | 'invitation';
type FormDataType =
  | Register
  | userLogin
  | NewExpenseData
  | NewFriend
  | NewGroupData
  | Invitation;
