import { getUser, getUserId } from '@/app/lib/auth';
import CardAvatar from '@/app/ui/components/dashboard/card/cardAvatar';
import CardDescription from '@/app/ui/components/dashboard/card/cardDescription';
import CardTitle from '@/app/ui/components/dashboard/card/cardTitle';

export default async function Page() {
  const user = await getUser();
  if (!user) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <>
      <div className="account-container">
        <div className="section-spacer"></div>
        <div className="group-card-container">
          <CardAvatar user={user} />

          {/* <div className="card-text-container"> */}
          <CardTitle title={user.name} />
          <CardDescription description={user.email} />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
