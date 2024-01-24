import { useUpdateExpense } from '@/app/lib/hooks/useUpdateExpense';
import { checkTransaction } from '@/app/lib/services/checkTransaction';
import React from 'react';
import FormHeader from './formHeader';
import FormInput from '../../global/formInput';
import IconsSelector from './iconsSelector';
import FormWarning from '../../global/formWarning';

export default function UpdateTransactionForm({
  searchParams,
}: {
  searchParams: {
    id: string;
    description: string;
    amount: string;
    icon: string;
    group: string;
    userid: string;
  };
}) {
  const { id, description, amount, icon, group, userid } = searchParams;

  const {
    getData,
    handleClick,

    showError,
    loading,
    error,
    onFocus,
    focusContainer,
    errorMessage,
    deleteTransaction,
    updateTransaction,
  } = useUpdateExpense(group, id, amount);
  return (
    <div className="form-body">
      <FormHeader title="Modificar gasto" />

      <div className="text-fields-container">
        <FormInput
          getData={getData}
          label={`Descripción: ${description}`}
          type="text"
          name="description"
          placeholder="Nueva descripción"
          onClick={handleClick}
        />
        <FormInput
          getData={getData}
          label={`Cantidad: ${amount}`}
          type="text"
          name="quantity"
          placeholder="Nueva cantidad"
          onClick={handleClick}
        />
      </div>
      <IconsSelector
        getData={getData}
        onClick={handleClick}
        focusContainer={focusContainer}
      />

      <button
        type="button"
        className={
          !showError.description &&
          !showError.quantity &&
          !showError.icon &&
          !loading
            ? 'submit-button'
            : 'submit-button disabled'
        }
        disabled={
          showError.description &&
          showError.quantity &&
          showError.icon &&
          loading
        }
        onClick={updateTransaction}
      >
        Modificar
      </button>
      <button
        type="button"
        className="submit-button"
        onClick={deleteTransaction}
      >
        Eliminar
      </button>
      <FormWarning
        showError={showError.group && onFocus.group}
        message="Nombre de grupo no válido"
      />
      <FormWarning
        showError={showError.description && onFocus.description}
        message="Descripción no válida"
      />
      <FormWarning
        showError={showError.quantity && onFocus.quantity}
        message="Cantidads no válida"
      />
      <FormWarning
        showError={showError.icon}
        message="Selecciona un icono"
      />
      <FormWarning
        showError={error}
        message={errorMessage}
      />
      <FormWarning
        showError={loading}
        message="... Loading"
      />
    </div>
  );
}
