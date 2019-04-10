import React, { useEffect, useMemo, useReducer } from "react";
import pathToRegexp, { Key } from "path-to-regexp";

type Params = {
  [key: string]: string;
};

type RouteMap = {
  [path: string]: (params: Params) => JSX.Element;
};

type Fallback = (path: string) => JSX.Element | null;

type RouterProps = {
  routes: RouteMap;
  fallback?: Fallback;
};

const createController = (routes: RouteMap, fallback: Fallback) => {
  const matchers = Object.entries(routes).map(([path, handler]) => {
    let keys = [] as Key[];
    return {
      re: pathToRegexp(path, keys),
      handler,
      keys
    };
  });
  return (path: string) => {
    for (const { re, handler, keys } of matchers) {
      const match = re.exec(path);
      if (!match) continue;
      const [, ...filledKeys] = match;
      const params = keys.reduce(
        (acc, key, i) => ({
          ...acc,
          [key.name]: filledKeys[i]
        }),
        {}
      );
      return handler(params);
    }
    return fallback(path);
  };
};

const useForceUpdate = () => {
  const [, f] = useReducer(s => !s, true);
  return () => f({});
};

const defaultFallback = () => <>Not found!</>;

const Router = ({ routes, fallback = defaultFallback }: RouterProps) => {
  const controller = useMemo(() => createController(routes, fallback), [
    routes
  ]);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const onPopState = () => {
      forceUpdate();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  return controller(document.location.pathname);
};

export default Router;
