import GroupsList from '../../ui/dashboard/groups/groupsList';
import SectionTitle from '@/app/ui/global/sectionTitle';

export default function Page() {
  return (
    <>
      {/* <Suspense fallback={<p>Loading</p>}> */}
      <div className="section-spacer"></div>
      <SectionTitle title="Grupos" />

      <GroupsList />
      {/* </Suspense> */}

      <div className="spacer"></div>
    </>
  );
}
