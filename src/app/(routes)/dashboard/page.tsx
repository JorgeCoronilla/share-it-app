import { Suspense } from 'react';
import GroupsList from '../../ui/dashboard/groups/groupsList';
import SectionTitle from '@/app/ui/global/sectionTitle';
import AddGroupButton from './create-group/page';
import ThemeSwitcher from '@/app/ui/global/themeSwitcher';
import AddFriendButton from '@/app/ui/dashboard/buttons/addFriend';
import AddExpenseButton from './create-expense/page';

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
