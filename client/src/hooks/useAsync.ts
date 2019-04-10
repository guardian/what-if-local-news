import { useEffect, useState } from "react";

const useAsync = <T, A extends any[], F extends (...args: A) => Promise<T>>(
  fn: F,
  initValue: T,
  ...args: A
) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(initValue);
  useEffect(() => {
    setLoading(true);
    fn(...args)
      .then(res => {
        setLoading(false);
        setResult(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, args);
  return [result, loading] as [T, boolean];
};

export { useAsync };
