import { getTransactions } from '@/app/lib/data';
import IconAccountBoxOutline from '@/app/ui/dashboard/account';

export default async function Page({ params }: { params: { slug: string } }) {
  const transactions = await getTransactions(params.slug);
  if (!transactions || transactions.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  console.log('Weee', transactions);

  return (
    <>
      <div className="spacer"></div>

      <h2 className="card-title">{transactions[0].group_name}</h2>
      {transactions.map(
        ({ id, user_name, date, description, amount, icon }) => {
          return (
            <>
              <div
                className="group-card-container"
                key={id}
              >
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
