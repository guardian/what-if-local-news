import React, { useCallback } from "react";

type LinkProps = {
  path: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

const push = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate", {}));
};

const Link = ({ path, children, ...rest }: LinkProps) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      push(path);
    },
    [path]
  );
  return (
    <a href={path} {...rest} onClick={onClick}>
      {children}
    </a>
  );
};

export { push };

export default Link;
