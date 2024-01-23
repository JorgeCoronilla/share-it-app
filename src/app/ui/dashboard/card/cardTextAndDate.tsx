import React from 'react';
interface Props {
  amount: string;
  date: string;
}
export default function CardTextAndDate({ amount, date }: Props) {
  return (
    <div className="card-amount-date highlight-text">
      <p>{amount} €</p>
      <p>{date}</p>
    </div>
  );
}
