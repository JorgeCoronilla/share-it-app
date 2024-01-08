import { getGroups } from '@/app/lib/services/groups';
import Link from 'next/link';

export default async function GroupCard() {
  const userData = await getGroups('uuid1');
  console.log(userData);
  if (!userData || userData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  let totalUserBalance = 0;
  userData.forEach(({ userDebt }) => {
    totalUserBalance += userDebt;
  });
  return (
    <div>
      {totalUserBalance >= 0 ? (
        <h4 className="main-text">
          En total te deben <span className="positive">{totalUserBalance}</span>{' '}
          €
        </h4>
      ) : (
        <p className="card-debt">
          En total debes{' '}
          <span className="negative">{totalUserBalance * -1}</span> €
        </p>
      )}
      {userData &&
        userData.map(
          ({
            id,
            name,
            icon,
            info,
            balance,
            members,
            group_balance,
            userDebt,
          }) => {
            return (
              <Link
                href={`/dashboard/${id}`}
                key={id}
              >
                <div
                  className="card-container"
                  key={id}
                >
                  <div className="card-icon-container">
                    <img
                      src={`/icons/${icon}.svg`}
                      alt={icon}
                      className="card-icon"
                    />
                  </div>
                  <div className="card-text-container">
                    <h2 className="card-title">{name}</h2>
                    {userDebt >= 0 ? (
                      <p className="card-debt">
                        Te deben <span className="positive">{userDebt}</span> €
                      </p>
                    ) : (
                      <p className="card-debt">
                        Debes <span className="negative">{userDebt * -1}</span>{' '}
                        €
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          }
        )}
    </div>
  );
}
