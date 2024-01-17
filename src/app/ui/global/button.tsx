'use client';
import React, { useEffect } from 'react';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({ type, text, className, disabled }: Props) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
