export type SortOrder = "asc" | "desc" | null;

export function sortByQuery<T>(
  data: T[] | undefined,
  key: keyof T,
  sortOrder: SortOrder
): T[] {
  if (!data) return [];

  const sortedData = [...data];

  if (sortOrder === "asc") {
    sortedData.sort((a, b) => String(a[key]).localeCompare(String(b[key])));
  } else if (sortOrder === "desc") {
    sortedData.sort((a, b) => String(b[key]).localeCompare(String(a[key])));
  }

  return sortedData;
}
