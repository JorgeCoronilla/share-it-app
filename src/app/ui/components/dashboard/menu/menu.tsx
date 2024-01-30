'use client';

import Link from 'next/link';
import IconAccountBoxOutline from '../../global/iconsComponents/accountIcon';
import IconActivityLog from '../../global/iconsComponents/activityIcon';
import IconUser from '../../global/iconsComponents/friendsIcon';
import IconUsers from '../../global/iconsComponents/groupsIcon';
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
        <IconUsers />
        <p className="menu-text">Grupos</p>
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
        <IconUser />
        <p className="menu-text">Amigos</p>
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
        <p className="menu-text">Actividad</p>
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
        <p className="menu-text">Cuenta</p>
      </Link>
    </div>
  );
}
