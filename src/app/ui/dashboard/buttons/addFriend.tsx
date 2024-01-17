'use client';
import FriendsIcon from '../iconsComponents/friendsIcon';
import { useRouter } from 'next/navigation';

export default function AddFriendButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/dashboard/invite-user')}
      className="add-button friend"
    >
      <div>
        <FriendsIcon />+
      </div>
    </button>
  );
}
