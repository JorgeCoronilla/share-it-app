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
      href={`/dashboard/${id}`}
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
              description="Te deben"
              highlightText={userDebt.toString()}
              className="positive"
            />
          ) : (
            <CardDescription
              description="Debes"
              highlightText={(userDebt * -1).toString()}
              className="negative"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
