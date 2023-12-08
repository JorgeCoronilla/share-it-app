import { getAllFriends } from '@/app/lib/data';
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
            className="card-container"
          >
            <div
              className="friends-card-text-container"
              key={friend.id}
            >
              <h2
                className="card-title"
                key={friend.id}
              >
                {friend.name}
              </h2>

              <p
                className="list-title positive"
                key={friend.id}
              >
                Grupos que compartís:
              </p>
              <ul>
                {friend.groups_ids.map((group, index) => {
                  return (
                    <>
                      <li
                        key={group}
                        className="groups-list normal-text"
                      >
                        {friend.groups_names[index]}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
            <div
              className="card-avatar-container"
              key={friend.id}
            >
              {friend.avatar === '' ? (
                <p
                  className="avatar-container"
                  key={friend.id}
                >
                  {friend.name.charAt(0)}
                </p>
              ) : (
                <img
                  src={friend.avatar}
                  alt="Avatar"
                  key={friend.id}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
