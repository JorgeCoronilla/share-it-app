import { getActivity } from '@/app/lib/services/activity';

export default async function Page() {
  const activity = await getActivity('uuid1');
  if (!activity || activity.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log(activity);
  return (
    <>
      {activity.map(
        ({ id, user_name, group_name, date, description, amount, icon }) => {
          return (
            <>
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
                  <h2 className="card-title">{group_name}</h2>
                  <h2 className="activity-card-title">{user_name}</h2>
                  <p className="normal-text ">{description}</p>
                  <div className="activity-card-amount highlight">
                    <p>{amount} €</p>
                    <p>{date.split(' ')[0]}</p>
                  </div>
                </div>
              </div>
            </>
          );
        }
      )}
      <div className="spacer"></div>
    </>
  );
}
