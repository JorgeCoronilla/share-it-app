'use client';
import { registerUser } from '@/app/lib/services/auth';
import FormHeader from '@/app/ui/dashboard/forms/formHeader';
import Button from '@/app/ui/global/button';
import SectionTitle from '@/app/ui/global/sectionTitle';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();

  const rendRegistration = async () => {
    const token = searchParams.get('token') || '';
    const userRegistration = registerUser(token);
    console.log(userRegistration);
  };
  return (
    <div className="new-group-modal">
      <FormHeader title="Ya casi lo tienes!" />
      <button
        className="submit-button"
        onClick={rendRegistration}
      >
        confirmar correo
      </button>
      <Button
        text="Confirmar correo"
        type={undefined}
      />
    </div>
  );
}
