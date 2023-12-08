import { Suspense } from 'react';
import GroupCard from '../ui/dashboard/groupCard';
import NewGroup from '../ui/dashboard/newGroup/newGroup';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <GroupCard />
      </Suspense>
      <NewGroup />
    </>
  );
}
