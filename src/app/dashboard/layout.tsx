import AddExpenseButton from '../ui/dashboard/addExpenseButtons';
import AddGroupButton from '../ui/dashboard/addGroupButton';
import Header from '../ui/dashboard/header';
import Menu from '../ui/dashboard/menu';
import ThemeSwitcher from '../ui/global/themeSwitcher';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Menu />
      <ThemeSwitcher pageClass="dashboard" />
      <AddGroupButton />
      <AddExpenseButton />{' '}
      <main className="dashboard-container">{children}</main>
    </>
  );
}
