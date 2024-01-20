import { Suspense } from 'react';
import GroupsList from '../../ui/dashboard/groups/groupsList';
import SectionTitle from '@/app/ui/global/sectionTitle';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <SectionTitle title="Grupos" />
        <GroupsList />
      </Suspense>
      <div className="spacer"></div>
    </>
  );
}
