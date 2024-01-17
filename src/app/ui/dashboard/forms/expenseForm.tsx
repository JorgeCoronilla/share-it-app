'use client';
import IconsSelector from './iconsSelector';
import FormHeader from './formHeader';
import FormInput from '../../global/formInput';
import InputList from '../../global/inputList';
import Button from '../../global/button';
import FormWarning from '../../global/formWarning';
import { useAdd } from '@/app/lib/hooks/useAddExpense';
import { expense_INTIAL_STATE } from '@/app/lib/constants';

interface ExpenseFormProps {
  groups?: GroupData[];
}

export default function ExpenseForm({ groups }: ExpenseFormProps) {
  const { getData, submit, showError, loading, error, onFocus, errorMessage } =
    useAdd(expense_INTIAL_STATE);

  return (
    <div className="new-group-modal">
      <FormHeader title="Crear nuevo gasto" />
      <form onSubmit={submit}>
        <div className="form-container">
          <div className="text-fields-container">
            <FormInput
              getData={getData}
              label="Grupo"
              type="text"
              name="group"
              placeholder="Group name"
              list="groups"
            />
            <InputList list={groups} />

            <FormInput
              getData={getData}
              label="Descripción"
              type="text"
              name="description"
              placeholder="Cena con amigos"
            />
            <FormInput
              getData={getData}
              label="Cantidad"
              type="text"
              name="quantity"
              placeholder="3.45"
            />
          </div>
          <IconsSelector getData={getData} />
        </div>
        <Button
          type="submit"
          text={'Añadir gasto'}
          className={
            showError.allfields ? 'submit-button' : 'submit-button disabled'
          }
          disabled={!showError.allfields}
        />
      </form>
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
