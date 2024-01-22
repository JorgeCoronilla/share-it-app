'use client';
import React from 'react';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  type,
  text,
  className,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
