import React from "react";
import Highlighter from "./Highlighter";
import Highlight from "./Highlight";
import Link from "./routing/Link";
import { Council } from "./services/councils";
import Paper from "./Paper";
import styled from "styled-components";

type CouncilPreviewProps = {
  council: Council;
  searchStrings?: string[];
};

const Title = styled.h2`
  margin: 0;
  text-decoration: underline;
`;

const Card = styled(Paper)`
  margin-bottom: 1em;
  padding: 1em;
`;

const CouncilPreview = ({ council, searchStrings }: CouncilPreviewProps) => (
  <Card>
    <Title>
      <Link
        path={
          council.name === "Health data"
            ? `/data/${council.id}`
            : `/council/${council.id}`
        }
      >
        <Highlighter
          string={council.name}
          substrings={searchStrings}
          renderMatch={str => <Highlight>{str}</Highlight>}
        />
      </Link>
    </Title>
  </Card>
);

export default CouncilPreview;
