import { getTransactions } from '@/app/lib/services/transactions';
import CardDescription from '@/app/ui/dashboard/card/cardDescription';
import CardIcon from '@/app/ui/dashboard/card/cardIcon';
import CardTextAndDate from '@/app/ui/dashboard/card/cardTextAndDate';
import CardTitle from '@/app/ui/dashboard/card/cardTitle';

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
            <div
              className="card-container"
              key={id}
            >
              <CardIcon icon={icon} />
              <div className="card-text-container">
                <CardTitle title={user_name} />
                <CardDescription description={description} />
                <CardTextAndDate
                  amount={amount.toString()}
                  date={date.split(' ')[0]}
                />
              </div>
            </div>
          );
        }
      )}
      <div className="spacer"></div>
    </>
  );
}
