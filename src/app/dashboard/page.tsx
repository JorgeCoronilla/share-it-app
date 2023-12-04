import { getGroups } from '../lib/data';
import GroupCard from '../ui/dashboard/groupCard';

export default async function Page() {
  const userData = await getGroups('uid1');
  console.log('resultado', userData);
  return (
    <main className="dashboard-container">
      <div className="spacer"></div>
      <p>En general debes 2.505,76 €</p>
      <GroupCard
        title="Casa - Compras"
        friends={['Vero']}
        amount="234"
        icon="Wallet"
      />
      <GroupCard
        title="Coche"
        friends={['Vero']}
        amount="895"
        icon="Wallet"
      />
      <GroupCard
        title="Suministros"
        friends={['Vero']}
        amount="234"
        icon="Wallet"
      />
      <GroupCard
        title="Vacacioness"
        friends={['Vero']}
        amount="1004"
        icon="Wallet"
      />
      <GroupCard
        title="Coche"
        friends={['Vero']}
        amount="895"
        icon="Wallet"
      />
      <GroupCard
        title="Suministros"
        friends={['Vero']}
        amount="234"
        icon="Wallet"
      />
      <GroupCard
        title="Vacacioness"
        friends={['Vero']}
        amount="1004"
        icon="Wallet"
      />
    </main>
  );
}
