import { ReactNode } from 'react';

import React from 'react';

export default function FriendsListlayout({
  children,
  activityList,
}: {
  children: ReactNode;
  activityList: ReactNode;
}) {
  return (
    <>
      <div className="section-spacer"></div>
      {children}
      {activityList}
      <div className="spacer"></div>
    </>
  );
}
