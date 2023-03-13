export function fakeFetch<T>(results: T, forceError: boolean = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) reject();
      else resolve(results);
    }, 560);
  });
}

export type ListItem = { id: number; name: string; amount: number };

export const MOCK_LIST: ListItem[] = [
  { id: 1, name: 'Test 1', amount: 12 },
  { id: 2, name: 'Test 2', amount: 8 },
  { id: 3, name: 'Test 5', amount: 4 },
];
