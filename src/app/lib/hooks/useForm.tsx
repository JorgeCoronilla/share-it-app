import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { form_INITIAL_STATE } from '../constants';
import { postUser } from '../services/auth';
import { useFocusValidation } from './useValidate';

export const useForm = () => {
  const [login, setLogin] = useState(form_INITIAL_STATE);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { onFocus, updateOnFocus, updateShowError, showError } =
    useFocusValidation();

  const router = useRouter();

  useEffect(() => {
    updateShowError(login);
  }, [login]);

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    updateOnFocus(name);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const userLogged = await postUser({
      name: login.name,
      email: login.email,
      password: login.password,
    });
    setLoading(false);
    if (userLogged.ok) {
      router.push(`/login`);
    } else {
      console.log('Error:', userLogged.status);
      const res = await userLogged.json();
      console.log('Message:', res.message);
      setErrorMessage(res.message);

      setError(true);
    }
  };
  return { getData, submit, showError, onFocus, error, errorMessage, loading };
};
