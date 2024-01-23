import { getUser, getUserId } from '@/app/lib/auth';
import { getGroups } from '@/app/lib/services/groups';
import FormHeader from '@/app/ui/dashboard/forms/formHeader';
import InviteFriendForm from '@/app/ui/dashboard/forms/inviteFriend';

import React from 'react';

export default async function Page() {
  const user: User = await getUser();
  let userGroups: GroupData[] | undefined = [];
  userGroups = (await getGroups(user.id)) || undefined;
  if ((userGroups && userGroups.length < 1) || userGroups === undefined) {
    userGroups = [];
  }
  return (
    <div className="form-body">
      <FormHeader title="Invita a un amig@" />
      <InviteFriendForm
        groups={userGroups}
        user={user}
      />
    </div>
  );
}
