import IconAccountBoxOutline from './account';

interface GroupCardProps {
  icon: string;
  title: string;
  amount: string;
  friends: string[];
}
export default function GroupCard({
  icon,
  title,
  amount,
  friends,
}: GroupCardProps) {
  return (
    <div className="group-card-container">
      <div className="card-icon-container">
        <IconAccountBoxOutline />
      </div>
      <div className="card-text-container">
        <h2 className="card-title">{title}</h2>
        <p className="card-debt">
          debes <span>{amount} €</span>
        </p>
        <p className="card-friends">Debes a {friends}</p>
      </div>
    </div>
  );
}
