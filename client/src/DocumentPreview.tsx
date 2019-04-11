import React from "react";
import Link from "./routing/Link";
import { Document } from "./services/documents";
import styled from "styled-components";
import Paper from "./Paper";
import Chip from "./Chip";

const Container = styled(Paper)`
  margin-bottom: 1em;
  padding: 1em;
`;

const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  text-decoration: underline;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MetaContainer = styled.div`
  font-size: 14px;
  margin: 1em 0;
`;

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
      <Link title={title} path={path}>
        {title}
      </Link>
    </Title>
    <MetaContainer>
      {chips.map(chip => (
        <Chip key={chip.label} label={chip.label}>
          {chip.value}
        </Chip>
      ))}
    </MetaContainer>
    <div>
      {[...new Set(highlights)].map(highlight => (
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
