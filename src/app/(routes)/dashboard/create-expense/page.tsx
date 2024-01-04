import { getGroups } from '@/app/lib/data';
import ExpenseForm from '@/app/ui/dashboard/forms/expenseForm';

export default async function AddExpenseButton() {
  const userData = (await getGroups('uuid1')) || undefined;
  console.log('Data: ', userData);

  return (
    <>
      {userData && userData.length < 1 ? (
        <p>Nop</p>
      ) : (
        <ExpenseForm groups={userData} />
      )}
    </>
  );
}
