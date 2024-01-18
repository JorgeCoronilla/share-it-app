import { getGroups } from '@/app/lib/services/groups';
import GroupCard from './groupCard';
import GroupsListHeader from './listHeader';
import NoData from '../../global/noData';
import { getUserId } from '@/app/lib/auth';

export default async function GroupsList() {
  const userID = await getUserId();
  const userData = await getGroups(userID);
  if (!userData || userData.length === 0) {
    return <NoData message="Todavía no perteneces a ningún grupo." />;
  }

  let totalUserBalance = 0;
  userData.forEach(({ userDebt }) => {
    totalUserBalance += userDebt;
  });
  return (
    <div>
      <GroupsListHeader totalUserBalance={totalUserBalance} />
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
              <GroupCard
                key={id}
                id={id}
                name={name}
                icon={icon}
                userDebt={userDebt}
              />
            );
          }
        )}
    </div>
  );
}
