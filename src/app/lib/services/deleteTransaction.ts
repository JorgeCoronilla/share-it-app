export async function deleteTransactionService(
  groupId: string,
  transactionId: string,
  transactionQuantity: string
) {
  console.log('transactionQuantity', transactionQuantity);
  return await fetch(
    `/api/delete-transaction?group=${groupId}&transaction=${transactionId}&quantity=${transactionQuantity}  `,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
