import { useState } from 'react';
import { validateForm } from '../validations';
import { validation_INITIAL_STATE } from '../constants';

export const useFocusValidation = () => {
  const [onFocus, setOnFocus] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );

  const [showError, setShowError] = useState<Record<string, boolean>>(
    validation_INITIAL_STATE
  );
  const updateOnFocus = (name: string) => {
    setOnFocus({
      ...validation_INITIAL_STATE,
      [name]: true,
    });
  };

  const updateShowError = (object: Register) => {
    setShowError(validateForm(object));
  };

  return { onFocus, updateOnFocus, updateShowError, showError, setShowError };
};
