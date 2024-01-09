import React from 'react';

interface Props {
  subtitle: string;
}
export default function CarSubtitle({ subtitle }: Props) {
  return <h2 className="activity-card-title">{subtitle}</h2>;
}
