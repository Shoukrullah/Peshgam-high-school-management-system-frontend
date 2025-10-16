import { useSearchParams } from "react-router-dom";

export function useAddQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setQuery(key: string, value?: string | null) {
    const newParams = new URLSearchParams(searchParams);

    if (!value || value.trim() === "") {
      // 🧹 Remove key if value is empty or default
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  }

  function getQuery(key: string) {
    return searchParams.get(key);
  }

  return { setQuery, getQuery };
}
