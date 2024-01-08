import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateForm } from '../validations';
import { form_INITIAL_STATE, validation_INITIAL_STATE } from '../constants';
import { postUser } from '../services/user';

export const useForm = () => {
  const [login, setLogin] = useState(form_INITIAL_STATE);

  const [showError, setShowError] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );

  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );

  const [error, setError] = useState(false);
  useEffect(() => {
    setShowError(validateForm(login));
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

    const userLogged = await postUser({
      name: login.name,
      email: login.email,
      password: login.password,
    });

    if (userLogged.ok) {
      router.push(`/login`);
    } else {
      console.log('Error:', userLogged.status);

      setError(true);
    }
  };
  return { getData, submit, showError, onFocus, error };
};
