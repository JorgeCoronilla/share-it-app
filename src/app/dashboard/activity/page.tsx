import { getActivity } from '@/app/lib/data';
import IconAccountBoxOutline from '@/app/ui/dashboard/account';

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
                className="group-card-container"
                key={id}
              >
                <h2 className="card-title">{group_name}</h2>
                <div className="card-icon-container">
                  <IconAccountBoxOutline />
                </div>
                <div className="card-text-container">
                  <h2 className="card-title">{description}</h2>
                  <p className="normal-text">{user_name}</p>
                  <p className="normal-text">{date}</p>
                  <p className="normal-text">{description}</p>
                  <p className="normal-text">{amount}</p>
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
