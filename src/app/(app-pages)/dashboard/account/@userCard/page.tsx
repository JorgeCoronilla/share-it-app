import { getUser, getUserId } from '@/app/lib/auth';
// import { getUser } from '@/app/lib/services/user';
import CardAvatar from '@/app/ui/dashboard/card/cardAvatar';
import CardDescription from '@/app/ui/dashboard/card/cardDescription';
import CardTitle from '@/app/ui/dashboard/card/cardTitle';

export default async function Page() {
  // const userId = await getUserId();
  // const user = await getUser(userId);
  const user = await getUser();
  if (!user) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log(user);
  return (
    <>
      <div className="section-spacer"></div>
      <div className="group-card-container">
        <CardAvatar user={user} />

        <div className="card-text-container">
          <CardTitle title={user.name} />
          <CardDescription description={user.email} />
        </div>
      </div>
    </>
  );
}
