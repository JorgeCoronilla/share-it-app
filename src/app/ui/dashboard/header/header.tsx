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
  return (
    <>
      <div className="header-container">
        <div className="header-row">
          <div className="title-container">
            <h1 className="title">Share-it</h1>
          </div>
          <div className="user-container">
            <div>
              <p className="user-name">{user.name}</p>
            </div>

            <CardAvatar user={user} />
            <Logout />
          </div>
        </div>
        <div className="header-row"></div>
      </div>
    </>
  );
}
