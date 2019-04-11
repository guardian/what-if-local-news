import React from "react";
import { Aggregates, AggregateData } from "./services/CouncillorService";
import Chip from "./Chip";
import styled from "styled-components";
import Paper from "./Paper";

type AggregateChipsProps = {
  aggregates: Aggregates;
  onChipClick: (data: string) => void;
  isActive: (term: string) => boolean;
};

// @TODO this normalization should not be done here!
const normalizeStr = (str: string) => {
  return str.replace("&", "and");
};

const normalize = (aggs: AggregateData[]) =>
  Object.values(
    aggs.reduce(
      (acc, agg) => {
        if (agg.key.length < 2) return acc;
        const nn = normalizeStr(agg.key);
        const prev = acc[nn] || { count: 0, key: nn };
        return {
          ...acc,
          [nn]: {
            ...prev,
            count: agg.count + prev.count
          }
        };
      },
      {} as { [key: string]: AggregateData }
    )
  ).filter(({ count }) => count > 1);

const capitalize = (str: string) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
const typeToTitle = (type: string) => capitalize(type.split("_")[1]);

const Wrapper = styled(Paper)`
  background: #f4f4f4;
  margin-top: 1em;
  padding: 1em;
`;

const Titles = styled.h4`
  margin: 0;
`;

const Types = styled.h5`
  display: inline-block;
  margin: 0;
  margin-right: 1em;
`;

const AggregateChips = ({
  aggregates,
  onChipClick,
  isActive
}: AggregateChipsProps) => {
  const filters = Object.entries(aggregates)
    .map(([type, aggs]): [string, AggregateData[]] => [type, normalize(aggs)])
    .filter(([, aggs]) => aggs.length);
  return !!filters.length ? (
    <Wrapper>
      <Titles>Filters</Titles>
      {filters.map(([type, aggs]) => (
        <div key={type}>
          <Types>{typeToTitle(type)}</Types>
          {aggs.map(({ key, count }) => (
            <Chip
              onClick={() => {
                onChipClick(key);
              }}
              isActive={isActive(key)}
              label={`${count}`}
              key={key}
            >
              {key}
            </Chip>
          ))}
        </div>
      ))}
    </Wrapper>
  ) : (
    <></>
  );
};

export default AggregateChips;
