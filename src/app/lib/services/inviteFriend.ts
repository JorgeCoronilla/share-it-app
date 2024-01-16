export async function addFriendToGroup({ group, email }: NewFriend) {
  return await fetch('/api/invite-friend', {
    method: 'POST',
    body: JSON.stringify({ group, email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
