import React from 'react';
interface Props {
  amount: string;
  date: string;
}
export default function CardTextAndDate({ amount, date }: Props) {
  return (
    <div className="activity-card-amount highlight">
      <p>{amount} €</p>
      <p>{date}</p>
    </div>
  );
}
