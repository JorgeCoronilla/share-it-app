'use client';
import { useState } from 'react';
import IconPencilFill from '../iconsComponents/pencilIcon';
import { useRouter } from 'next/navigation';

export default function AddExpenseButton() {
  const [display, setDisplay] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/dashboard/create-expense')}
      className="add-button expense"
    >
      <div>
        <IconPencilFill />+
      </div>
    </button>
  );
}
