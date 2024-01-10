import React from 'react';
interface Props {
  totalUserBalance: number;
}

export default function GroupsListHeader({ totalUserBalance }: Props) {
  return (
    <>
      {totalUserBalance >= 0 ? (
        <h4 className="main-text">
          En total te deben{' '}
          <span className="positive">{totalUserBalance.toFixed(2)}</span> €
        </h4>
      ) : (
        <p className="card-debt">
          En total debes{' '}
          <span className="negative">{(totalUserBalance * -1).toFixed(2)}</span>{' '}
          €
        </p>
      )}
    </>
  );
}
