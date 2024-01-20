import AddFriendButton from '@/app/ui/dashboard/buttons/addFriend';
import AddExpenseButton from '../../ui/dashboard/buttons/addExpenseButtons';
import AddGroupButton from '../../ui/dashboard/buttons/addGroupButton';
import Header from '../../ui/dashboard/header/header';
import Menu from '../../ui/dashboard/menu/menu';
import ThemeSwitcher from '../../ui/global/themeSwitcher';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Menu />
      <ThemeSwitcher pageClass="dashboard" />
      <AddGroupButton />
      <AddFriendButton />
      <AddExpenseButton />
      <main className="dashboard-container">
        <div className="spacer"></div>

        {children}
      </main>
    </>
  );
}
