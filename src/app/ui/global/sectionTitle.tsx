import React from 'react';
interface Props {
  title: string;
}
export default function SectionTitle({ title }: Props) {
  return <h1 className="section-title">{title}</h1>;
}
