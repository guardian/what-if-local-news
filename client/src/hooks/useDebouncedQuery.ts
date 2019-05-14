import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useAsync } from "./useAsync";

const useDebouncedQuery = <
  T,
  A,
  F extends (query: string, ...args: A[]) => Promise<T>
>(
  fn: F,
  initResult: T,
  debounceMs = 0,
  initQuery: string = "",
  ...extraArgs: A[]
) => {
  const [query, setQuery] = useState(initQuery);
  const [debouncedQuery] = useDebounce(query, debounceMs);
  const [result, loading] = useAsync(
    fn,
    initResult,
    debouncedQuery,
    ...extraArgs
  );
  return [result, loading, query, setQuery] as [
    typeof result,
    typeof loading,
    typeof query,
    typeof setQuery
  ];
};

export { useDebouncedQuery };
