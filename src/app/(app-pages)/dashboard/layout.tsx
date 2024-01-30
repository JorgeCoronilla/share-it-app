import Header from '@/app/ui/components/dashboard/header/header';
import ThemeSwitcher from '../../ui/components/global/themeSwitcher';
import Menu from '@/app/ui/components/dashboard/menu/menu';
import AddFriendButton from '@/app/ui/components/dashboard/buttons/addFriend';
import AddExpenseButton from '@/app/ui/components/dashboard/buttons/addExpenseButtons';
import AddGroupButton from '@/app/ui/components/dashboard/buttons/addGroupButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Menu />
      <ThemeSwitcher pageClass="dashboard" />
      <AddGroupButton />
      <AddFriendButton />
      <AddExpenseButton />
      <div className="blur-stain-1"></div>
      <div className="blur-stain-2"></div>
      <main className="dashboard-container">{children}</main>
    </>
  );
}
