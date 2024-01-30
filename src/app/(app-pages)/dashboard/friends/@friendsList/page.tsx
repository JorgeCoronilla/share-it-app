import { getUserId } from '@/app/lib/auth';
import { getAllFriends } from '@/app/lib/services/friends';
import CardList from '@/app/ui/components/dashboard/card/cardList';
import CardSubtitle from '@/app/ui/components/dashboard/card/cardSubtitle';
import CardTitle from '@/app/ui/components/dashboard/card/cardTitle';
import NoData from '@/app/ui/components/global/noData';

export default async function Page() {
  const userId = await getUserId();
  const friends = await getAllFriends(userId);

  if (!friends) {
    return <NoData message="Todavía no tienes ningún amigo." />;
  }
  return (
    <>
      {friends.map((friend) => {
        return (
          <div
            key={friend.id}
            className="card-container"
          >
            <div
              className="card-text-container-no-icon"
              key={`c-${friend.id}`}
            >
              <CardTitle
                title={friend.name}
                key={`t-${friend.id}`}
              />
              <CardSubtitle
                key={`s-${friend.id}`}
                subtitle="Grupos que compartís:"
              />
              <CardList
                key={`l-${friend.id}`}
                friend={friend}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
