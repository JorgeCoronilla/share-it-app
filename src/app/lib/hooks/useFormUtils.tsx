import { useState } from 'react';
import {
  formTypes,
  login_INITIAL_STATE,
  form_INITIAL_STATE,
  login_validation_INITIAL_STATE,
  validation_INITIAL_STATE,
} from '../constants';

export const useFormUtils = (formType: formTypes) => {
  const data_INITIAL_STATE =
    formType === formTypes.login ? login_INITIAL_STATE : form_INITIAL_STATE;

  const errors_INITIAL_STATE =
    formType === formTypes.login
      ? login_validation_INITIAL_STATE
      : validation_INITIAL_STATE;

  const [data, setData] = useState(data_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onFocus, setOnFocus] =
    useState<Record<string, boolean>>(errors_INITIAL_STATE);
  const [error, setError] = useState(false);
  const [showError, setShowError] =
    useState<Record<string, boolean>>(errors_INITIAL_STATE);

  const getData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    const currentField = {
      ...errors_INITIAL_STATE,
      [name]: true,
    };
    setOnFocus(currentField);
  };

  return {
    data,
    setShowError,
    setLoading,
    setError,
    getData,
    showError,
    loading,
    onFocus,
    error,
    errorMessage,
    setErrorMessage,
  };
};
