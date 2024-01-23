import Link from 'next/link';
import React from 'react';
import CardIcon from '../card/cardIcon';
import CardTitle from '../card/cardTitle';
import CardDescription from '../card/cardDescription';
import CarSubtitle from '../card/cardSubtitle';

interface Props {
  id: string;
  name: string;
  icon: string;
  userDebt: number;
  groupBalance: number;
  userID: string;
}

export default function GroupCard({
  id,
  name,
  icon,
  userDebt,
  groupBalance,
  userID,
}: Props) {
  return (
    <Link
      href={`/dashboard/${id}?name=${name}&balance=${groupBalance}&userid=${userID}`}
      key={id}
    >
      <div
        className="card-container"
        key={id}
      >
        <CardIcon icon={icon} />
        <div className="card-text-container">
          <CardTitle title={name} />
          <CarSubtitle subtitle={`Total del grupo: ${groupBalance}`} />
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
