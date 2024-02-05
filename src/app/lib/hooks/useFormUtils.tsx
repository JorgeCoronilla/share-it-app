import { useRef, useState } from 'react';
import {
  formTypes,
  login_INITIAL_STATE,
  form_INITIAL_STATE,
  login_validation_INITIAL_STATE,
  validation_INITIAL_STATE,
  expense_INTIAL_STATE,
  addFriend_INITIAL_STATE,
  group_INTIAL_STATE,
  addExpense_validation_INITIAL_STATE,
  addFriend_validation_INITIAL_STATE,
  addGroup_validation_INITIAL_STATE,
  invitation_validation_INITIAL_STATE,
} from '../constants';
import { useRouter } from 'next/navigation';

export const useFormStates = (formType: formTypes) => {
  const errors_INITIAL_STATE =
    formType === formTypes.login
      ? login_validation_INITIAL_STATE
      : formType === formTypes.register
      ? validation_INITIAL_STATE
      : formType === formTypes.expenses
      ? addExpense_validation_INITIAL_STATE
      : formType === formTypes.friends
      ? addFriend_validation_INITIAL_STATE
      : formType === formTypes.groups
      ? addGroup_validation_INITIAL_STATE
      : formType === formTypes.invitation
      ? invitation_validation_INITIAL_STATE
      : validation_INITIAL_STATE;

  const data_INITIAL_STATE =
    formType === formTypes.login
      ? login_INITIAL_STATE
      : formType === formTypes.register
      ? form_INITIAL_STATE
      : formType === formTypes.expenses
      ? expense_INTIAL_STATE
      : formType === formTypes.friends
      ? addFriend_INITIAL_STATE
      : formType === formTypes.groups
      ? group_INTIAL_STATE
      : form_INITIAL_STATE;
  const router = useRouter();
  const [data, setData] = useState(data_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [focusContainer, setFocusContainer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [onFocus, setOnFocus] =
    useState<Record<string, boolean>>(errors_INITIAL_STATE);
  const [error, setError] = useState(false);
  const [showError, setShowError] =
    useState<Record<string, boolean>>(errors_INITIAL_STATE);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.name && target.name === 'icon') {
      setFocusContainer(true);
    } else {
      setFocusContainer(false);
    }
  };
  const previousIcon = useRef<string>('');
  const getData = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | React.MouseEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    if ('name' in target) {
      const { name, value, id } = target;
      if (name === 'icon') {
        if (previousIcon.current !== id) {
          const icons =
            document.querySelectorAll<HTMLInputElement>('input.icon-input');
          icons.forEach((icon) => {
            if (icon.id !== target.id) icon.checked = false;
          });
        }
        previousIcon.current = id;
      }

      setData({ ...data, [name]: value });
      const currentField = {
        ...errors_INITIAL_STATE,
        [name]: true,
      };
      setOnFocus(currentField);
    }
  };

  return {
    setShowError,
    setLoading,
    setError,
    setErrorMessage,
    setOnFocus,
    getData,
    setData,
    handleClick,
    showError,
    onFocus,
    loading,
    error,
    errorMessage,
    data,
    focusContainer,
    router,
  };
};
