import { getGroups } from '@/app/lib/data';
import IconAccountBoxOutline from './account';

export default async function GroupCard() {
  const userData = await getGroups('uuid1');

  if (!userData || userData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log('Weeee', userData);
  return (
    <div>
      {userData &&
        userData.map((group) => (
          <div
            className="group-card-container"
            key={group.id}
          >
            <div className="card-icon-container">
              <IconAccountBoxOutline />
            </div>
            <div className="card-text-container">
              <h2 className="card-title">{group.name}</h2>
              <p className="card-debt">
                debes <span>{group.balance} €</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
