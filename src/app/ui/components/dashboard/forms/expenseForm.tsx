'use client';
import IconsSelector from './iconsSelector';
import FormHeader from './formHeader';
import FormInput from '../../global/formInput';
import Button from '../../global/button';
import FormWarning from '../warnings/formWarning';
import { useAddExpense } from '@/app/lib/hooks/useAddExpense';
import Select from '../../global/select';
import FormError from '../warnings/formError';
import Loading from '../../global/loading';

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
    <>
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
            <FormWarning
              showError={showError.group && onFocus.group}
              message="Nombre de grupo no válido"
            />

            <FormInput
              getData={getData}
              label="Descripción"
              type="text"
              name="description"
              placeholder="Cena con amigos"
            />
            <FormWarning
              showError={showError.description && onFocus.description}
              message="Descripción no válida"
            />
            <FormInput
              getData={getData}
              label="Cantidad"
              type="text"
              name="quantity"
              placeholder="3.45"
            />
            <FormWarning
              showError={showError.quantity && onFocus.quantity}
              message="Cantidad no válida"
            />
          </div>
          <IconsSelector
            getData={getData}
            onClick={handleClick}
            focusContainer={focusContainer}
          />
          <FormWarning
            showError={showError.icon}
            message="Selecciona un icono"
            icon={true}
          />

          <Button
            type="submit"
            text={'Añadir gasto'}
            className={
              showError.allfields ? 'submit-button' : 'submit-button disabled'
            }
            disabled={!showError.allfields}
          />
        </form>
        <Loading
          showError={loading}
          message="... Loading"
        />
        <FormError
          showError={error}
          message={errorMessage}
        />
      </div>
    </>
  );
}
