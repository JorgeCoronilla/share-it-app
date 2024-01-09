import React from 'react';

interface Props {
  description: string;
  highlightText?: string;
  className?: string;
}
export default function CardDescription({
  description,
  className,
  highlightText,
}: Props) {
  return (
    <p className="card-debt">
      {description} <span className={className}>{highlightText}</span>
    </p>
  );
}
