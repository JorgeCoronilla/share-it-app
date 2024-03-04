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
      <div className="form-header-container">
        <button
          onClick={() => router.push('/dashboard')}
          className="close-form"
          aria-label="Close form"
        >
          <div className="close-container">
            <img
              src="/icons/close-icon.svg"
              alt="Avatar"
            />
          </div>
        </button>
      </div>

      <SectionTitle title={title} />
    </div>
  );
}
