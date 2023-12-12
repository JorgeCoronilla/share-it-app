'use client';

import IconUsers from '../iconsComponents/groupsIcon';
import { useRouter } from 'next/navigation';

export default function AddGroupButton() {
  const router = useRouter();

  return (
    <>
      <button
        className="add-button group"
        onClick={() => router.push('/dashboard/create-group')}
      >
        <div>
          <IconUsers />+
        </div>
      </button>
    </>
  );
}
