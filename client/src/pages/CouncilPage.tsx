import React from "react";
import Omni from "../Omni";
import {
  DocumentWithPeopleAndPlaces,
  search,
  getCouncil,
  CouncilWithPeopleAndKeyPhrases
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
    (query: string) => search({ query, councilId: id }).then(r => r.results),
    [] as DocumentWithPeopleAndPlaces[],
    500
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
              <KeyPhrase key={keyphrase.phrase}>
                <button
                  onClick={() => {
                    if (!tags.includes(keyphrase)) push(keyphrase);
                  }}
                >
                  {keyphrase.phrase}
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
            <KeyPhrase key={keyphrase.phrase}>
              <button onClick={() => remove(i)}>{keyphrase.phrase}</button>
            </KeyPhrase>
          ))}
          <ol>
            {results.map(document => (
              <li key={document.id}>
                <DocumentPreview document={document} searchString={query} />
              </li>
            ))}
          </ol>
        </Body>
      </InfoPage>
    </Container>
  ) : null;
};

export default CouncilPage;
