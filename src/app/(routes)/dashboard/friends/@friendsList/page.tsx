import { getAllFriends } from '@/app/lib/services/friends';
import CardAvatar from '@/app/ui/dashboard/card/cardAvatar';
import CardList from '@/app/ui/dashboard/card/cardList';
import CardSubtitle from '@/app/ui/dashboard/card/cardSubtitle';
import CardTitle from '@/app/ui/dashboard/card/cardTitle';
import NoData from '@/app/ui/global/noData';

export default async function Page() {
  const friends = await getAllFriends('uuid2');

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
              className="friends-card-text-container"
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
            <CardAvatar
              key={`a-${friend.id}`}
              user={friend}
            />
          </div>
        );
      })}
    </>
  );
}
