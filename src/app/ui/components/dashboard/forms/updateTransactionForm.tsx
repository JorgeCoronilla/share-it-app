import { useUpdateExpense } from '@/app/lib/hooks/useUpdateExpense';
import FormHeader from './formHeader';
import FormInput from '../../global/formInput';
import IconsSelector from './iconsSelector';
import FormWarning from '../warnings/formWarning';
import FormError from '../warnings/formError';
import Loading from '../../global/loading';

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
  } = useUpdateExpense(group, id, amount, description, icon);
  return (
    <>
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
          <FormWarning
            showError={showError.description && onFocus.description}
            message="Descripción no válida"
          />
          <FormInput
            getData={getData}
            label={`Cantidad: ${amount}`}
            type="text"
            name="quantity"
            placeholder="Nueva cantidad"
            onClick={handleClick}
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
          value={icon}
        />

        <button
          type="button"
          className={'submit-button'}
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
        <FormError
          showError={error}
          message={errorMessage}
        />
      </div>

      <Loading
        showError={loading}
        message="... Loading"
      />
    </>
  );
}
