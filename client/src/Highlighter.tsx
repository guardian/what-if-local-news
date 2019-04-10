import React from "react";
type HighlighterProps = {
  string: string;
  substring?: string;
  renderMatch: (substring: string) => JSX.Element;
};

const Highlighter = ({ string, substring, renderMatch }: HighlighterProps) => (
  <>
    {substring
      ? string
          .split(new RegExp(`(${substring})`, "gi"))
          .reduce(
            (acc, str, i) => [...acc, i % 2 ? renderMatch(str) : str],
            [] as (JSX.Element | string)[]
          )
      : string}
  </>
);

export default Highlighter;
