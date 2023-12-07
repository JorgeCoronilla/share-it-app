import { getAllFriends } from '@/app/lib/data';
import Icon from '../../ui/icons/garden.svg';
export default async function Page() {
  const friends = await getAllFriends('uuid1');
  if (!friends) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log('Component', friends);
  return (
    <>
      {friends.map((friend) => {
        return (
          <div
            key={friend.id}
            className="group-card-container"
          >
            <div className="card-icon-container">
              {friend.avatar === '' ? (
                <p className="normal-text">{friend.name.charAt(0)}</p>
              ) : (
                <img
                  src={friend.avatar}
                  alt="Avatar"
                />
              )}
            </div>
            <div className="card-text-container">
              <h2 className="card-title">{friend.name}</h2>

              <p className="card-debt">{friend.email}</p>
              <p className="card-debt">Grupor que compartís:</p>
              <ul>
                {friend.groups_ids.map((group, index) => {
                  return (
                    <>
                      <li
                        key={group}
                        className="card-debt"
                      >
                        {friend.groups_names[index]}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}
