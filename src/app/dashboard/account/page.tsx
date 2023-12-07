import { getUser } from '@/app/lib/data';

export default async function Page() {
  const user = await getUser('uuid1');
  if (!user) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log(user);
  return (
    <>
      {/* <img
        src="/icons/garden.svg"
        alt="garden-icon"
      /> */}
      <div className="group-card-container">
        <div className="card-icon-container">
          <img
            src={user.avatar}
            alt="Avatar"
          />
        </div>
        <div className="card-text-container">
          <h2 className="card-title">{user.name}</h2>

          <p className="card-debt">{user.email}</p>
        </div>
      </div>
    </>
  );
}
