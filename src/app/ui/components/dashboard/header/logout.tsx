'use client';

import { useLogout } from '@/app/lib/hooks/useLogout';
import React from 'react';
import { IconLogout } from '../../global/iconsComponents/logaoutIcon';

export default function Logout() {
  const { logout } = useLogout();
  return (
    <div
      className="normal-text logout-button"
      onClick={logout}
    >
      <IconLogout />
    </div>
  );
}
