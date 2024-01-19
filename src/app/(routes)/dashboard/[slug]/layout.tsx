import DeleteGroupButton from '@/app/ui/dashboard/buttons/deleteGroupButton';
import { ReactNode } from 'react';

import React from 'react';

export default function Transactionlayout({
  children,
  transactions,
}: {
  children: ReactNode;
  transactions: ReactNode;
}) {
  return (
    <>
      {children}
      {transactions}
      <DeleteGroupButton />
      <div className="spacer"></div>
    </>
  );
}
