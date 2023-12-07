'use client';

import Link from 'next/link';
import IconAccountBoxOutline from '../iconsComponents/accountIcon';
import IconActivityLog from '../iconsComponents/activityIcon';
import IconUser from '../iconsComponents/friendsIcon';
import IconUsers from '../iconsComponents/groupsIcon';
import { usePathname } from 'next/navigation';
export default function Menu() {
  const pathName = usePathname();
  return (
    <div className="menu">
      <Link
        key="groups"
        href="/dashboard"
        className={`${
          pathName === `/dashboard` ? 'menu-button-active' : 'menu-button'
        } }`}
      >
        <IconUsers /> Grupos
      </Link>
      <Link
        key="friends"
        href="/dashboard/friends"
        className={`${
          pathName === `/dashboard/friends`
            ? 'menu-button-active'
            : 'menu-button'
        } }`}
      >
        <IconUser /> Amigos
      </Link>
      <Link
        key="activity"
        href="/dashboard/activity"
        className={`${
          pathName === `/dashboard/activity`
            ? 'menu-button-active'
            : 'menu-button'
        } }`}
      >
        <IconActivityLog />
        Actividad
      </Link>
      <Link
        key="account"
        href="/dashboard/account"
        className={`${
          pathName === `/dashboard/account`
            ? 'menu-button-active'
            : 'menu-button'
        } }`}
      >
        <IconAccountBoxOutline />
        Cuenta
      </Link>
    </div>
  );
}
