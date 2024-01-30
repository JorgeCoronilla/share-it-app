import { getUserId } from '@/app/lib/auth';
import { getGroups } from '@/app/lib/services/groups';
import ExpenseForm from '@/app/ui/components/dashboard/forms/expenseForm';

export default async function AddExpenseButton() {
  const userID = await getUserId();
  let userGroups: GroupData[] | undefined = [];
  userGroups = (await getGroups(userID)) || undefined;
  if ((userGroups && userGroups.length < 1) || userGroups === undefined) {
    userGroups = [];
  }
  return (
    <>
      <div className="form-container">
        <ExpenseForm groups={userGroups} />
      </div>
    </>
  );
}
