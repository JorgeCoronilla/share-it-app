'use client';

import UpdateTransactionForm from '@/app/ui/dashboard/forms/updateTransactionForm';

import React from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
    description: string;
    amount: string;
    icon: string;
    group: string;
    userid: string;
  };
}) {
  return (
    <div className="form-container">
      <UpdateTransactionForm searchParams={searchParams} />
    </div>
  );
}
