import { loginUser, postUser } from './services/auth';

export const icons = [
  'bill_icon',
  'car_icon',
  'garage_icon',
  'house_icon',
  'internet_icon',
  'garden_icon',
  'petrol_icon',
  'shopping_icon',
  'tax_icon',
  'plane_icon',
];

export const addMessageInitialState = {
  message: false,
  display: false,
  user: 'uuid1',
};

export const validation_INITIAL_STATE = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
  allfields: false,
};

export const form_INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const expense_INTIAL_STATE = {
  group: '',
  description: '',
  quantity: '',
  icon: '',
};

export const group_INTIAL_STATE = {
  name: '',
  description: '',
  icon: '',
};

export const login_INITIAL_STATE = {
  email: '',
  password: '',
};

export const addFriend_INITIAL_STATE = {
  group: '',
  email: '',
};

export const addFriend_validation_INITIAL_STATE = {
  group: false,
  email: false,
};

export const login_validation_INITIAL_STATE = {
  email: false,
  password: false,
};

export const addGroup_validation_INITIAL_STATE = {
  name: false,
  description: false,
  icon: true,
  allfields: false,
};

export const addExpense_validation_INITIAL_STATE = {
  group: false,
  description: false,
  quantity: false,
  icon: true,
  allfields: false,
};

export const formResources = {
  login: {
    data_INITIAL_STATE: login_INITIAL_STATE,
    validation_INITIAL_STATE: login_validation_INITIAL_STATE,
    action: (data: userLogin) => loginUser(data),
  },
  register: {
    data_INITIAL_STATE: form_INITIAL_STATE,
    validation_INITIAL_STATE: validation_INITIAL_STATE,
    action: (data: userRegister) => postUser(data),
  },
};

export const formTypes = {
  login: 'login',
  register: 'register',
};
