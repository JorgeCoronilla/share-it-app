import { getUserId } from '@/app/lib/auth';
import { getActivity } from '@/app/lib/services/activity';
import CardDescription from '@/app/ui/components/dashboard/card/cardDescription';
import CardIcon from '@/app/ui/components/dashboard/card/cardIcon';
import CarSubtitle from '@/app/ui/components/dashboard/card/cardSubtitle';
import CardTextAndDate from '@/app/ui/components/dashboard/card/cardTextAndDate';
import CardTitle from '@/app/ui/components/dashboard/card/cardTitle';

import NoData from '@/app/ui/components/global/noData';
import React from 'react';

export default async function ActivitiesList() {
  const userId = await getUserId();

  const activity = await getActivity(userId);
  if (!activity || activity.length === 0) {
    return <NoData message="Todavía no tienes ninguna actividad." />;
  }
  console.log(activity);

  return (
    <>
      <div className="section-spacer"></div>
      {activity.map(
        ({ id, user_name, group_name, date, description, amount, icon }) => {
          return (
            <div
              className="card-container"
              key={id}
            >
              <div className="card-text-container">
                <CardDescription description="Grupo:" />

                <CardTitle title={group_name} />
                <CarSubtitle subtitle={description} />
                <CardDescription description={user_name} />
                <CardTextAndDate
                  amount={amount.toString()}
                  date={date.split(' ')[0]}
                />
              </div>
              <CardIcon
                icon={icon}
                key={`i-${id}`}
              />
            </div>
          );
        }
      )}
    </>
  );
}
