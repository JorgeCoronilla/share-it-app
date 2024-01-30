'use client';
import FriendsIcon from '../../global/iconsComponents/friendsIcon';
import { useRouter } from 'next/navigation';

export default function AddFriendButton() {
  const router = useRouter();

  return (
    <div className="add-button-container friend">
      <button
        onClick={() => router.push('/add/invite-user')}
        className="add-button "
      >
        <div>
          <FriendsIcon />
        </div>
      </button>
    </div>
  );
}
