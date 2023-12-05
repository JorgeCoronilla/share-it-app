import { Suspense } from 'react';
import GroupCard from '../ui/dashboard/groupCard';

export default async function Page() {
  return (
    <>
      {' '}
      <div className="spacer"></div>
      <Suspense fallback={<p>Loading</p>}>
        <GroupCard />
      </Suspense>
    </>
  );
}
