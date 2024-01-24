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
      <div className="section-spacer"></div>
      {children}
      {userCard}
      <div className="spacer"></div>
    </>
  );
}
