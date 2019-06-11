import React from "react";
import Omni from "../Omni";
import {
  search,
  getCouncil,
  SearchResponse
} from "../services/CouncillorService";
import { Council } from "../services/councils";
import styled from "styled-components";
import { useDebouncedQuery } from "../hooks/useDebouncedQuery";
import { useAsync } from "../hooks/useAsync";
import InfoPage from "../InfoPage";
import CouncilSidebar from "../CouncilSidebar";
import DocumentPreview from "../DocumentPreview";
import { useArray } from "../hooks/useArray";
import AggregateChips from "../AggregateChips";
import Logo from "../Logo";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Body = styled.div`
  width: 100%;
`;

const InfoWrapper = styled.div`
  padding: 5em;
  text-align: center;
`;

type CouncilPageProps = {
  id: string;
};

const CouncilPage = ({ id }: CouncilPageProps) => {
  const [tags, push, remove] = useArray<string>();
  const [results, loading, query, setQuery] = useDebouncedQuery(
    (query, tags) => search({ query, tags, queryStem: "/api/search"}),
    {
      hits: [],
      aggs: {
        significant_sentiment: [],
        significant_key_phrases: [],
        significant_people: [],
        significant_dates: [],
        significant_organisations: [],
        significant_places: []
      }
    } as SearchResponse,
    500,
    "",
    tags
  );
  const [council] = useAsync(
    (id: string) => getCouncil(id).then(res => res.results),
    undefined as Council | undefined,
    id
  );
  return council ? (
    <Container>
      <InfoPage sidebar={<CouncilSidebar council={council} />}>
        <Body>
          <Omni
            loading={loading}
            label={`Search all documents for ${council.name}`}
            value={query}
            onChange={setQuery}
          />
          <AggregateChips
            aggregates={results.aggs}
            isActive={term => tags.includes(term)}
            onChipClick={term => {
              const termIndex = tags.indexOf(term);
              if (termIndex < 0) {
                push(term);
              } else {
                remove(termIndex);
              }
            }}
          />
          {!loading ? (
            results.hits.length ? (
              <ol>
                {results.hits.map(document => (
                  <li key={document.id}>
                    <DocumentPreview
                      document={document}
                      searchStrings={[query, ...tags]}
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <InfoWrapper>
                {query ? "No results :(" : "Enter a search"}
              </InfoWrapper>
            )
          ) : (
            <InfoWrapper>
              <Logo animate width={150} lineColor="#333" />
            </InfoWrapper>
          )}
        </Body>
      </InfoPage>
    </Container>
  ) : null;
};

export default CouncilPage;
