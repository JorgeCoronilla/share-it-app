import { ReactNode } from 'react';

import React from 'react';

export default function FriendsListlayout({
  children,
  friendsList,
}: {
  children: ReactNode;
  friendsList: ReactNode;
}) {
  return (
    <>
      {children}
      {friendsList}
      <div className="spacer"></div>
    </>
  );
}
