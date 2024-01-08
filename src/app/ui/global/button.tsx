'use client';
import React from 'react';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  className?: string;
}

export default function Button({ type, text, className }: Props) {
  return (
    <button
      type={type}
      className={className}
    >
      {text}
    </button>
  );
}
