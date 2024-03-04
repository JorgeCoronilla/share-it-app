'use client';

import IconUsers from '../../global/iconsComponents/groupsIcon';
import { useRouter } from 'next/navigation';

export default function AddGroupButton() {
  const router = useRouter();

  return (
    <>
      <div className="add-button-container group">
        <button
          className="add-button"
          onClick={() => router.push('/add/create-group')}
          aria-label="Add group"
        >
          <div>
            <IconUsers />
          </div>
        </button>
      </div>
    </>
  );
}
