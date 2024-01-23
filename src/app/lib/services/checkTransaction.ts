export async function checkTransaction(transactionId: string) {
  return await fetch('/api/check-transaction-ownership', {
    method: 'POST',
    body: JSON.stringify(transactionId),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
