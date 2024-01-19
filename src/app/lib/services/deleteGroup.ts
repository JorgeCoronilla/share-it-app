export async function deleteGroupService(id: string, name: string) {
  return await fetch(`/api/delete-groups?group=${id}&name=${name}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
