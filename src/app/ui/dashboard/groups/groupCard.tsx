import Link from 'next/link';
import React from 'react';
import CardIcon from '../card/cardIcon';
import CardTitle from '../card/cardTitle';
import CardDescription from '../card/cardDescription';

interface Props {
  id: string;
  name: string;
  icon: string;
  userDebt: number;
}

export default function GroupCard({ id, name, icon, userDebt }: Props) {
  return (
    <Link
      href={`/dashboard/${id}?name=${name}`}
      key={id}
    >
      <div
        className="card-container"
        key={id}
      >
        <CardIcon icon={icon} />
        <div className="card-text-container">
          <CardTitle title={name} />
          {userDebt >= 0 ? (
            <CardDescription
              description="Debes"
              highlightText={userDebt.toFixed(2)}
              className="negative"
            />
          ) : (
            <CardDescription
              description="Te deben"
              highlightText={(userDebt * -1).toFixed(2)}
              className="positive"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
