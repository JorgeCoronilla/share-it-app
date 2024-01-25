export async function addFriendToGroup({
  group_name,
  group_id,
  hostName,
  email,
}: NewFriendPetition) {
  return await fetch('/api/invite-friend', {
    method: 'POST',
    body: JSON.stringify({ group_name, group_id, hostName, email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
