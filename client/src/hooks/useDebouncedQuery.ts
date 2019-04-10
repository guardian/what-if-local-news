import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useAsync } from "./useAsync";

const useDebouncedQuery = <T, F extends (query: string) => Promise<T>>(
  fn: F,
  initResult: T,
  debounceMs = 0,
  initQuery: string = ""
) => {
  const [query, setQuery] = useState(initQuery);
  const [debouncedQuery] = useDebounce(query, debounceMs);
  const [result, loading] = useAsync(fn, initResult, debouncedQuery);
  return [result, loading, query, setQuery] as [
    typeof result,
    typeof loading,
    typeof query,
    typeof setQuery
  ];
};

export { useDebouncedQuery };
