import React from "react";
type HighlighterProps = {
  string: string;
  substrings?: string[];
  renderMatch: (substring: string) => JSX.Element;
};

const Highlighter = ({ string, substrings, renderMatch }: HighlighterProps) => (
  <>
    {substrings
      ? string
          .split(new RegExp(`(${substrings.join("|")})`, "gi"))
          .reduce(
            (acc, str, i) => [
              ...acc,
              i % 2 ? (
                <React.Fragment key={i}>{renderMatch(str)}</React.Fragment>
              ) : (
                str
              )
            ],
            [] as (JSX.Element | string)[]
          )
      : string}
  </>
);

export default Highlighter;
