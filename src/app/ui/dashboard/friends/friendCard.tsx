import IconAccountBoxOutline from '../iconsComponents/accountIcon';

export default function FriendCard() {
  return (
    <div className="friend-card-container">
      <div className="card-icon-container">
        <IconAccountBoxOutline />
      </div>
      {/* <div className="card-text-container">
                <h2 className="card-title">{title}</h2>
                <p className="card-debt">
                    debes <span>{amount} €</span>
                </p>
                <p className="card-friends">Debes a {friends}</p>
            </div> */}
    </div>
  );
}
