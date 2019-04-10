import React from "react";
import Link from "./routing/Link";
import { DocumentWithPeopleAndPlaces } from "./services/CouncillorService";
import styled from "styled-components";
import Paper from "./Paper";
import Highlighter from "./Highlighter";
import Highlight from "./Highlight";

const Container = styled(Paper)`
  margin-bottom: 1em;
  padding: 1em;
`;

const Title = styled.h3`
  margin: 0;
  text-decoration: underline;
`;

type ChipProps = {
  label: string;
  children: string;
};

const MetaContainer = styled.div`
  font-size: 14px;
  margin: 1em 0;
`;

const ChipWrapper = styled.div`
  display: inline-block;
  margin-right: 0.5em;
`;

const ChipLabel = styled(Paper)`
  background: #9e5ace;
  color: #fff;
  display: inline-block;
  padding: 0.5em;
`;

const ChipValue = styled(Paper)`
  background: #fff;
  color: #9e5ace;
  display: inline-block;
  padding: 0.5em;
`;

const Chip = ({ label, children }: ChipProps) => (
  <ChipWrapper>
    <ChipLabel>{label}</ChipLabel>
    <ChipValue>{children}</ChipValue>
  </ChipWrapper>
);

type DocumentPreviewProps = {
  document: DocumentWithPeopleAndPlaces;
  searchString?: string;
};

const DocumentPreview = ({ document, searchString }: DocumentPreviewProps) => (
  <Container>
    <Title>
      <Link path={`/council/${document.councilId}/document/${document.id}`}>
        <Highlighter
          string={document.name}
          substring={searchString}
          renderMatch={str => <Highlight>{str}</Highlight>}
        />
      </Link>
    </Title>
    <MetaContainer>
      <Chip label="Date">
        {new Date(document.date).toLocaleDateString("en-gb")}
      </Chip>
      <Chip label="Type">{document.type}</Chip>
    </MetaContainer>
    <div>
      <Highlighter
        string={document.text}
        substring={searchString}
        renderMatch={str => <Highlight>{str}</Highlight>}
      />
    </div>
  </Container>
);

export default DocumentPreview;
