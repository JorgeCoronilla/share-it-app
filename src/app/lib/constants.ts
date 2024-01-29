export const icons2 = [
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

export const icons = [
  // 'icon_basket',
  'icon_flower',
  'icon_rocking_hand',
  'icon_beer',
  // 'icon_fruits',
  // 'icon_running_shoes',
  'icon_bill',
  'icon_fuel',
  'icon_sea',
  'icon_books',
  'icon_furniture',
  'icon_shoes',
  'icon_bulb',
  'icon_game',
  'icon_sports',
  'icon_car',
  'icon_hotel',
  'icon_supermarket',
  'icon_cleaning',
  'icon_house',
  'icon_ticket',
  'icon_cocktail',
  'icon_lighting',
  'icon_tools',
  'icon_coffee',
  'icon_note',
  'icon_tv',
  'icon_education',
  'icon_plane',
  'icon_vegetables',
  'icon_fashion',
  'icon_restaurant',
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
  icon: false,
  allfields: false,
};

export const addExpense_validation_INITIAL_STATE = {
  group: false,
  description: false,
  quantity: false,
  icon: true,
  allfields: false,
};
export const invitation_validation_INITIAL_STATE = {
  name: false,
  password: false,
  confirmPassword: false,
};
export const formTypes = {
  login: 'login',
  register: 'register',
  expenses: 'expenses',
  groups: 'groups',
  friends: 'friends',
  invitation: 'invitation',
};
