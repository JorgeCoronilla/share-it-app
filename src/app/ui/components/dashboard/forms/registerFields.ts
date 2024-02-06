export const formFields = [
  {
    label: 'Nombre',
    name: 'name',
    type: 'text',
    placeholder: 'John Doe',
    autoComplete: 'name',
    message: 'Nombre no válido',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'email@me.com',
    autoComplete: 'email',
    message: 'Email no válido',
  },
  {
    label: 'Contraseña',
    name: 'password',
    type: 'password',
    placeholder: '********',
    autoComplete: 'new-password',
    message:
      'La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  },
  {
    label: 'Confirma contraseña',
    name: 'confirmPassword',
    type: 'password',
    placeholder: '********',
    autoComplete: 'new-password',
    message: 'Las contraseñas no coinciden',
  },
];

export const invitationFormFields = (value: string) => {
  return [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'John Doe',
      autoComplete: 'name',
      message: 'Please provide a valid name',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'email@me.com',
      autoComplete: 'email',
      message: 'Please provide a valid email',
      value: `${value}`,
      readOnly: true,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '********',
      autoComplete: 'new-password',
      message:
        'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: '********',
      autoComplete: 'new-password',
      message: 'Your passwords don’t match',
    },
  ];
};
