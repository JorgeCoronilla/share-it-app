import React from 'react';

interface Props {
  text: string;
}

export default function EmptyDash({ text }: Props) {
  return (
    <div className="emptyDash">
      <p>{text}</p>
    </div>
  );
}
