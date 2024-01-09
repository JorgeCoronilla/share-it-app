'use client';
import IconsSelector from './iconsSelector';
import FormHeader from './formHeader';
import FormInput from '../../global/formInput';
import InputList from '../../global/inputList';
import Button from '../../global/button';
import { useAddAction } from '@/app/lib/hooks/useAddAction';
import { createExpense } from '@/app/lib/services/formActions';

interface ExpenseFormProps {
  groups?: GroupData[];
  userID: string;
}

export default function ExpenseForm({ groups, userID }: ExpenseFormProps) {
  const { formAction } = useAddAction({ createFunction: createExpense });

  return (
    <div className="new-group-modal">
      <FormHeader title="Crear nuevo gasto" />
      <form action={formAction}>
        <div className="form-container">
          <div className="text-fields-container">
            <FormInput
              label="Grupo"
              type="text"
              name="group"
              placeholder="Group name"
              list="groups"
            />
            <InputList list={groups} />

            <FormInput
              label="Descripción"
              type="text"
              name="description"
              placeholder="Cena con amigos"
            />
            <FormInput
              label="Cantidad"
              type="text"
              name="quantity"
              placeholder="3.45"
            />
          </div>
          <IconsSelector />
        </div>
        <Button
          type="submit"
          className="submit-button"
          text={'Añadir gasto'}
        />
      </form>
    </div>
  );
}
