import React from "react";
import Omni from "../Omni";
import { searchCouncil } from "../services/CouncillorService";
import { Council } from "../services/councils";
import styled from "styled-components";
import { useDebouncedQuery } from "../hooks/useDebouncedQuery";
import CouncilPreview from "../CouncilPreview";

const Container = styled.div``;

const Results = styled.ol`
  width: 100%;
  padding: 1em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
`;

const CouncilPickerPage = () => {
  const [results, loading, query, setQuery] = useDebouncedQuery(
    (query: string) => searchCouncil(query).then(r => r.results),
    [] as Council[],
    500
  );
  return (
    <Grid>
      <Container>
        <Omni
          loading={loading}
          label="Find council"
          value={query}
          onChange={setQuery}
        />
        <Results>
          {results.map(council => (
            <li key={council.id}>
              <CouncilPreview council={council} searchString={query} />
            </li>
          ))}
        </Results>
      </Container>
    </Grid>
  );
};

export default CouncilPickerPage;
