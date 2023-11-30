import Header from '../ui/dashboard/header';
import Menu from '../ui/dashboard/menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Menu />
      {children}
    </>
  );
}
