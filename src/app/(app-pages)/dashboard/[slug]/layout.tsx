import DeleteGroupButton from '@/app/ui/components/dashboard/buttons/deleteGroupButton';
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
      <div className="section-spacer"></div>
      {children}
      {transactions}
      <DeleteGroupButton />
      <div className="spacer"></div>
    </>
  );
}
