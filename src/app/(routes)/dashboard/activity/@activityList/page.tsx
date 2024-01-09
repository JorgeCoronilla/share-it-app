import { getActivity } from '@/app/lib/services/activity';
import CardDescription from '@/app/ui/dashboard/card/cardDescription';
import CardIcon from '@/app/ui/dashboard/card/cardIcon';
import CarSubtitle from '@/app/ui/dashboard/card/cardSubtitle';
import CardTextAndDate from '@/app/ui/dashboard/card/cardTextAndDate';
import CardTitle from '@/app/ui/dashboard/card/cardTitle';
import NoData from '@/app/ui/global/noData';
import React from 'react';

export default async function ActivitiesList() {
  const activity = await getActivity('uuid1');
  if (!activity || activity.length === 0) {
    return <NoData message="Todavía no tienes ninguna actividad." />;
  }
  console.log(activity);

  return (
    <>
      {activity.map(
        ({ id, user_name, group_name, date, description, amount, icon }) => {
          return (
            <div
              className="card-container"
              key={id}
            >
              <CardIcon
                icon={icon}
                key={`i-${id}`}
              />
              <div className="card-text-container">
                <CardTitle title={group_name} />
                <CarSubtitle subtitle={user_name} />
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
    </>
  );
}
