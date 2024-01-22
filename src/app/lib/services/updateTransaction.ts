export async function updateTransactionService(
  groupId: string,
  transactionId: string,
  oldQuantity: string,
  description: string,
  icon: string,
  newQuantity: string
) {
  console.log('Llega=??????', description);
  return await fetch(`/api/update-transaction`, {
    method: 'PUT',
    body: JSON.stringify({
      icon,
      description,
      groupId,
      transactionId,
      oldQuantity,
      newQuantity,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
