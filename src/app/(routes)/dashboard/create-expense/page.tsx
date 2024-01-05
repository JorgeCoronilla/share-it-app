import { verifyJwtToken } from '@/app/lib/auth';
import { getGroups } from '@/app/lib/data';
import ExpenseForm from '@/app/ui/dashboard/forms/expenseForm';
import { cookies } from 'next/headers';
export default async function AddExpenseButton() {
  const cookieStore = cookies();
  const user = cookieStore.get('access-token');
  let userID: string = '';

  if (user) {
    const cookiePairs = user.value.split('; ');
    const tokenPair = cookiePairs.find((pair) =>
      pair.startsWith('access-token=')
    );

    // Gets token from cookie
    if (tokenPair) {
      const token = tokenPair.split('=')[1];
      const verified = await verifyJwtToken(token);
      userID = verified?.id?.toString() || '';
    }
  }
  let userGroups: GroupData[] | undefined = [];

  userGroups = (await getGroups(userID)) || undefined;
  console.log('Data: ', userGroups);

  return (
    <>
      {userGroups && userGroups.length < 1 ? (
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
