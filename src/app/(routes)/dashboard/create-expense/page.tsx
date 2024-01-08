import { getUserId } from '@/app/lib/auth';
import { getGroups } from '@/app/lib/services/groups';

import ExpenseForm from '@/app/ui/forms/expenseForm';

export default async function AddExpenseButton() {
  const userID = await getUserId();
  let userGroups: GroupData[] | undefined = [];
  userGroups = (await getGroups(userID)) || undefined;
  console.log('Data: ', userID, userGroups);

  return (
    <>
      {(userGroups && userGroups.length < 1) || userGroups === undefined ? (
        <p>Nop</p>
      ) : (
        <ExpenseForm
          groups={userGroups}
          userID={userID}
        />
      )}
    </>
  );
}
