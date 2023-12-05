import { Suspense } from 'react';
import { getGroups } from '../lib/data';
import GroupCard from '../ui/dashboard/groupCard';

type GroupData = {
  group_id: string;
  group_name: string;
  group_icon: string;
  user_balance: number;
};
export default async function Page() {
  return (
    <main className="dashboard-container">
      <div className="spacer"></div>
      <p className="normal-text">En general debes 2.505,76 €</p>
      <Suspense fallback={<p>Loading</p>}>
        <GroupCard />
      </Suspense>
    </main>
  );
}
