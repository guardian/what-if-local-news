import React from "react";
import Omni from "../Omni";
import {
  search,
  getCouncil,
  CouncilWithPeopleAndKeyPhrases,
  SearchResponse
} from "../services/CouncillorService";
import styled from "styled-components";
import { useDebouncedQuery } from "../hooks/useDebouncedQuery";
import { useAsync } from "../hooks/useAsync";
import InfoPage from "../InfoPage";
import CouncilSidebar from "../CouncilSidebar";
import DocumentPreview from "../DocumentPreview";
import KeyPhrase from "../KeyPhrase";
import { useArray } from "../hooks/useArray";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Body = styled.div`
  width: 100%;
`;

type CouncilPageProps = {
  id: string;
};

const CouncilPage = ({ id }: CouncilPageProps) => {
  const [tags, push, remove] = useArray<
    CouncilWithPeopleAndKeyPhrases["keyphrases"][number]
  >();
  const [results, loading, query, setQuery] = useDebouncedQuery(
    (query, tags) => search({ query, tags }),
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
    undefined as CouncilWithPeopleAndKeyPhrases | undefined,
    id
  );
  return council ? (
    <Container>
      <InfoPage sidebar={<CouncilSidebar council={council} />}>
        <Body>
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <h4 style={{ margin: 0 }}>Key phrases</h4>
            {council.keyphrases.map(keyphrase => (
              <KeyPhrase key={keyphrase}>
                <button
                  onClick={() => {
                    if (!tags.includes(keyphrase)) push(keyphrase);
                  }}
                >
                  {keyphrase}
                </button>
              </KeyPhrase>
            ))}
          </div>
          <Omni
            loading={loading}
            label={`Search all documents for ${council.name}`}
            value={query}
            onChange={setQuery}
          />
          {tags.map((keyphrase, i) => (
            <KeyPhrase key={keyphrase}>
              <button onClick={() => remove(i)}>{keyphrase}</button>
            </KeyPhrase>
          ))}
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
        </Body>
      </InfoPage>
    </Container>
  ) : null;
};

export default CouncilPage;
