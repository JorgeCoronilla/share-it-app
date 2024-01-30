import GroupsList from '@/app/ui/components/dashboard/groups/groupsList';
import SectionTitle from '@/app/ui/components/global/sectionTitle';
import { Suspense } from 'react';
import Loading from './loading';

export default function Page() {
  return (
    <>
      <div className="section-spacer"></div>
      <SectionTitle title="Grupos" />
      <Suspense fallback={<Loading />}>
        <GroupsList />
      </Suspense>

      <div className="spacer"></div>
    </>
  );
}
