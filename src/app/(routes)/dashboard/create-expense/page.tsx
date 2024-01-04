import { getJwtSecretKey, verifyJwtToken } from '@/app/lib/auth';
import { getGroups } from '@/app/lib/data';
import ExpenseForm from '@/app/ui/dashboard/forms/expenseForm';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
export default async function AddExpenseButton() {
  const cookieStore = cookies();
  const user = cookieStore.get('access-token');
  let userData: User;
  if (user) {
    const cookiePairs = user.value.split('; ');
    const tokenPair = cookiePairs.find((pair) =>
      pair.startsWith('access-token=')
    );

    // Gets token from cookie
    if (tokenPair) {
      const token = tokenPair.split('=')[1];
      const verified: User | null = await verifyJwtToken(token);
      console.log('Verified: ', verified);
      userData = {
        id: verified?.id,
        email: verified?.email,
        name: verified?.name,
        avatar: verified?.avatar,
      };
    }
  }
  const userGroups = (await getGroups(userData.id)) || undefined;
  console.log('Data: ', userGroups);
  return (
    <>
      {userGroups && userGroups.length < 1 ? (
        <p>Nop</p>
      ) : (
        <ExpenseForm
          groups={userGroups}
          userID={userData.id}
        />
      )}
    </>
  );
}
