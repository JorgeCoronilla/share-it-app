import GroupsList from '@/app/ui/components/dashboard/groups/groupsList';
import SectionTitle from '@/app/ui/components/global/sectionTitle';

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
