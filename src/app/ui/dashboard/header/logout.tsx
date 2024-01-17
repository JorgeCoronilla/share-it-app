'use client';

import { useLogout } from '@/app/lib/hooks/useLogout';
import React from 'react';

export default function Logout() {
  const { logout } = useLogout();
  return (
    <button
      className="normal-text logout-button"
      onClick={logout}
    >
      logout
    </button>
  );
}
