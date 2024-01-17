import { getUser } from '@/app/lib/services/user';
import CardAvatar from '../card/cardAvatar';
import Logout from './logout';

export default async function Header() {
  let user = await getUser();

  if (!user) {
    user = {
      id: 'groupId',
      name: 'Jorge',
      email: 'info@gmail.com',
      avatar: '',
    };
  }
  console.log(user);
  return (
    <>
      <div className="header-container">
        <h1
          className="text-right text-2xl mt-1
        title"
        >
          Share-it
        </h1>
        <Logout />
        <div className="user-container">
          <p className="user-name">{user.name}</p>
          <CardAvatar user={user} />L
        </div>
      </div>
    </>
  );
}
