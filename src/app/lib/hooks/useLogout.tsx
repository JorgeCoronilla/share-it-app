import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export const useLogout = () => {
  const router = useRouter();
  const logout = () => {
    deleteCookie('access-token');
    router.push(`/`);
  };
  return { logout };
};
