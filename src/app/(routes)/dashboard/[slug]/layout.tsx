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
      <div className="spacer"></div>
    </>
  );
}
