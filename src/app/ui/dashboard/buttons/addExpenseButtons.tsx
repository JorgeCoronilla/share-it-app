'use client';
import IconPencilFill from '../iconsComponents/pencilIcon';
import { useRouter } from 'next/navigation';

export default function AddExpenseButton() {
  const router = useRouter();

  return (
    <div className="add-button-container expense">
      <button
        onClick={() => router.push('/add/create-expense')}
        className="add-button "
      >
        <div>
          <IconPencilFill />
        </div>
      </button>
    </div>
  );
}
