import { Suspense } from 'react';
import GroupsList from '../../ui/dashboard/groups/groupsList';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <GroupsList />
      </Suspense>
      <div className="spacer"></div>
    </>
  );
}
