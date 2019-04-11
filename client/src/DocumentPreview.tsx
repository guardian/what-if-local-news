import React from "react";
import Link from "./routing/Link";
import { Document } from "./services/documents";
import styled from "styled-components";
import Paper from "./Paper";

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

type DocumentPreviewContainerProps = {
  highlights: string[];
  searchStrings?: string[];
  title: string;
  path: string;
  chips: { label: string; value: string }[];
};

const Highlight = styled.div`
  em {
    background-color: yellow;
  }
`;

const DocumentPreviewContainer = ({
  highlights,
  searchStrings,
  title,
  path,
  chips
}: DocumentPreviewContainerProps) => (
  <Container>
    <Title>
      <Link path={path}>{title}</Link>
    </Title>
    <MetaContainer>
      {chips.map(chip => (
        <Chip key={chip.label} label={chip.label}>
          {chip.value}
        </Chip>
      ))}
    </MetaContainer>
    <div>
      {highlights.map(highlight => (
        <Highlight
          key={highlight}
          dangerouslySetInnerHTML={{ __html: highlight }}
        />
      ))}
    </div>
  </Container>
);

type DocumentPreviewProps = {
  document: Document;
  searchStrings?: string[];
};

const DocumentPreview = ({ document, searchStrings }: DocumentPreviewProps) => {
  switch (document.index) {
    case "planning-applications": {
      return (
        <DocumentPreviewContainer
          highlights={document.highlights || []}
          searchStrings={searchStrings}
          title={document.title}
          path=""
          chips={[
            { value: document.index, label: "Type" },
            { value: document.fields.dateReceived, label: "Date received" }
          ]}
        />
      );
    }
    case "council-petitions": {
      return (
        <DocumentPreviewContainer
          highlights={document.highlights || []}
          searchStrings={searchStrings}
          title={document.title}
          path=""
          chips={[{ value: document.index, label: "Type" }]}
        />
      );
    }
    case "council-contracts": {
      return (
        <DocumentPreviewContainer
          highlights={document.highlights || []}
          searchStrings={searchStrings}
          title={document.title}
          path=""
          chips={[{ value: document.index, label: "Type" }]}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default DocumentPreview;
