export async function registerTransaction({
  group,
  description,
  quantity,
  icon,
}: NewExpenseData) {
  return await fetch('/api/new-expense', {
    method: 'POST',
    body: JSON.stringify({ group, description, quantity, icon }),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
}
