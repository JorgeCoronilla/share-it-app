'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SectionTitle from '../../global/sectionTitle';

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
      <SectionTitle title={title} />
    </div>
  );
}
