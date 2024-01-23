'use client';

import { IconDeleteBin } from '../iconsComponents/deleteBin';
import { useRouter } from 'next/navigation';
import { useParams, useSearchParams } from 'next/navigation';

export default function DeleteGroupButton() {
  const router = useRouter();
  const group = useParams().slug;
  const name = useSearchParams().get('name');
  return (
    <>
      <button
        className="add-button delete-group"
        onClick={() =>
          router.push(`/add/delete-group?group=${group}&name=${name}`)
        }
      >
        <div>
          <IconDeleteBin />+
        </div>
      </button>
    </>
  );
}
