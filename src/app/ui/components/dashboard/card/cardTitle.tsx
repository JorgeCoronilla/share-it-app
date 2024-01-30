import React from 'react';

interface Props {
  title: string;
}
export default function CardTitle({ title }: Props) {
  return <h2 className="card-title">{title}</h2>;
}
