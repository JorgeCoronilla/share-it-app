import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useForm = () => {
  const [login, setLogin] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const validation_INITIAL_STATE = {
    name: false,
    email: false,
    password: false,
    passwordConfirmation: false,
    allfields: false,
  };
  const [showError, setShowError] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );

  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );

  const [error, setError] = useState(false);
  useEffect(() => {
    setShowError(validate(login));
  }, [login]);
  const router = useRouter();

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    const currentField = {
      ...validation_INITIAL_STATE,
      [name]: true,
    };
    setOnFocus(currentField);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLogged = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        name: login.name,
        email: login.email,
        password: login.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Llega??', userLogged);

    if (userLogged.ok) {
      router.push(`/login`);
    } else {
      console.log('Error:', userLogged.status);

      setError(true);
    }
  };
  return { getData, submit, showError, onFocus };
};

function validate(values: Register) {
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
