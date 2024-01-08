import { getUser } from '@/app/lib/services/user';

export default async function Page() {
  const user = await getUser('uuid1');
  if (!user) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log(user);
  return (
    <>
      <div className="spacer"></div>
      <div className="group-card-container">
        <div
          className="account-avatar-container"
          key={user.id}
        >
          {user.avatar === '' ? (
            <p
              className="avatar-container"
              key={user.id}
            >
              {user.name.charAt(0)}
            </p>
          ) : (
            <img
              src={user.avatar}
              alt="Avatar"
              key={user.id}
              className="avatar"
            />
          )}
        </div>
        <div className="card-text-container">
          <h2 className="card-title">{user.name}</h2>

          <p className="card-debt">{user.email}</p>
        </div>
      </div>
    </>
  );
}
