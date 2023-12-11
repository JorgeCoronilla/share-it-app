import { Suspense } from 'react';
import GroupCard from '../ui/dashboard/groupCard';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <GroupCard />
      </Suspense>
      <div className="spacer"></div>
    </>
  );
}
