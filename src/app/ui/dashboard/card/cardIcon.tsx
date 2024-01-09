import React from 'react';

interface Props {
  icon: string;
}
export default function CardIcon({ icon }: Props) {
  return (
    <div className="card-icon-container">
      <img
        src={`/icons/${icon}.svg`}
        alt={icon}
        className="card-icon"
      />
    </div>
  );
}
