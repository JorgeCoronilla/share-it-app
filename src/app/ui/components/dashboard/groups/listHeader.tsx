import React from 'react';
import CarSubtitle from '../card/cardSubtitle';
interface Props {
  totalUserBalance: number;
}

export default function GroupsListHeader({ totalUserBalance }: Props) {
  return (
    <>
      {totalUserBalance >= 0 ? (
        <h4 className="main-text">
          En total debes{' '}
          <span className="negative">{totalUserBalance.toFixed(2)}</span> €
        </h4>
      ) : (
        <h4 className="main-text">
          En total te deben{' '}
          <span className="positive">{(totalUserBalance * -1).toFixed(2)}</span>{' '}
          €
        </h4>
      )}
    </>
  );
}