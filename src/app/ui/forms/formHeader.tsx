'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
}

export default function FormHeader({ title }: Props) {
  const router = useRouter();
  return (
    <div>
      {' '}
      <button
        onClick={() => router.push('/dashboard')}
        className="close-modal"
      >
        <div className="close-container">
          <img
            src="/icons/close-icon.svg"
            alt="Avatar"
          />
        </div>
      </button>
      <div className="spacer"></div>
      <h1 className="modal-title">{title}</h1>
    </div>
  );
}
