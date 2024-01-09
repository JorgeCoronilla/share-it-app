import { ReactNode } from 'react';

import React from 'react';

export default function UserInfolayout({
  children,
  userCard,
}: {
  children: ReactNode;
  userCard: ReactNode;
}) {
  return (
    <>
      {children}
      {userCard}
      <div className="spacer"></div>
    </>
  );
}
