'use client';
import IconsSelector from './iconsSelector';
import FormHeader from './formHeader';
import FormInput from '../../global/formInput';
import Button from '../../global/button';
import FormWarning from '../../global/formWarning';
import { useAddExpense } from '@/app/lib/hooks/useAddExpense';
import Select from '../../global/select';

interface ExpenseFormProps {
  groups?: GroupData[];
}

export default function ExpenseForm({ groups }: ExpenseFormProps) {
  const {
    getData,
    submit,
    handleClick,
    showError,
    loading,
    error,
    onFocus,
    focusContainer,
    errorMessage,
  } = useAddExpense();

  return (
    <div className="form-body">
      <FormHeader title="Crear nuevo gasto" />
      <form onSubmit={submit}>
        <div>
          <Select
            label="Nombre del grupo"
            groups={groups}
            getData={getData}
            name="group"
          />

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
        <IconsSelector
          getData={getData}
          onClick={handleClick}
          focusContainer={focusContainer}
        />

        <Button
          type="submit"
          text={'Añadir gasto'}
          className={
            showError.allfields && !loading
              ? 'submit-button'
              : 'submit-button disabled'
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
