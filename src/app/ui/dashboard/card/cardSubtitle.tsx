import React from 'react';

interface Props {
  subtitle: string;
}
export default function CarSubtitle({ subtitle }: Props) {
  return <h2 className="card-subtitle">{subtitle}</h2>;
}
