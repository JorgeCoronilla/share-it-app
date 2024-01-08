import { getTransactions } from '@/app/lib/services/transactions';

export default async function Page({ params }: { params: { slug: string } }) {
  const transactions = await getTransactions(params.slug);
  if (!transactions || transactions.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log('Weee', transactions);

  return (
    <>
      <h2 className="card-title">{transactions[0].group_name}</h2>
      {transactions.map(
        ({ id, user_name, date, description, amount, icon }) => {
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
