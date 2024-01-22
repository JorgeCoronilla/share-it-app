'use client';

import { useUpdateExpense } from '@/app/lib/hooks/useUpdateExpense';
import FormHeader from '@/app/ui/dashboard/forms/formHeader';
import IconsSelector from '@/app/ui/dashboard/forms/iconsSelector';
import FormInput from '@/app/ui/global/formInput';
import FormWarning from '@/app/ui/global/formWarning';
import React from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
    description: string;
    amount: string;
    icon: string;
    group: string;
  };
}) {
  const { id, description, amount, icon, group } = searchParams;
  const {
    getData,
    showError,
    loading,
    error,
    onFocus,
    errorMessage,
    deleteTransaction,
    updateTransaction,
  } = useUpdateExpense(group, id, amount);

  return (
    <div className="new-group-modal">
      <FormHeader title="Modificar gasto" />
      <div className="form-container">
        <div className="text-fields-container">
          <FormInput
            getData={getData}
            label={description}
            type="text"
            name="description"
            placeholder="Nueva descripción"
          />
          <FormInput
            getData={getData}
            label={amount}
            type="text"
            name="quantity"
            placeholder="Nueva cantidad"
          />
        </div>
        <IconsSelector getData={getData} />
      </div>
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
