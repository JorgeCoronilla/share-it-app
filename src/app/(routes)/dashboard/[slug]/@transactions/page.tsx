import { getTransactions } from '@/app/lib/services/transactions';
import CardDescription from '@/app/ui/dashboard/card/cardDescription';
import CardIcon from '@/app/ui/dashboard/card/cardIcon';
import CardTextAndDate from '@/app/ui/dashboard/card/cardTextAndDate';
import CardTitle from '@/app/ui/dashboard/card/cardTitle';
import CardSubtitle from '@/app/ui/dashboard/card/cardSubtitle';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { name: string; balance: string };
}) {
  const transactions = await getTransactions(params.slug);
  const name = searchParams.name;
  const balance = searchParams.balance;
  console.log(transactions);
  if (!transactions || transactions.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <>
      <CardTitle title={name} />
      <CardSubtitle subtitle={`Total del grupo: ${balance}`} />
      {transactions.map(
        ({ id, user_name, date, description, amount, icon }) => {
          return (
            <Link
              href={`/dashboard/transaction-update?id=${id}&description=${description}&amount=${amount}&icon=${icon}&group=${params.slug}`}
              key={id}
            >
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
            </Link>
          );
        }
      )}
      <div className="spacer"></div>
    </>
  );
}
