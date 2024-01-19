export async function registerGroup({ name, description, icon }: NewGroupData) {
  return await fetch('/api/new-group', {
    method: 'POST',
    body: JSON.stringify({ name, description, icon }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// export async function registerGroup({ name, description, icon }: NewGroupData) {
//   return await fetch('/api/send-mail', {
//     method: 'POST',
//     body: JSON.stringify({ name, description, icon }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }
