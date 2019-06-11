import React from "react";
import Link from "./routing/Link";
import { Document } from "./services/documents";
import styled from "styled-components";
import Paper from "./Paper";
import Chip from "./Chip";
import Button from "./Button";

const Container = styled(Paper)`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
  padding: 1em;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
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

const Actions = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: right;
`;

type DocumentPreviewContainerProps = {
  highlights: string[];
  searchStrings?: string[];
  title: string;
  path: string;
  chips: { label: string; value: string }[];
};

const Highlight = styled.div`
  font-size: 14px;
  margin-bottom: 1em;

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
    <Inner>
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
    </Inner>
    <Actions>
      <Button>
        <Link path={path}>View &raquo;</Link>
      </Button>
    </Actions>
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
          path={`/document/${document.index}/${document.id}`}
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
          path={`/document/${document.index}/${document.id}`}
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
          path={`/document/${document.index}/${document.id}`}
          chips={[{ value: document.index, label: "Type" }]}
        />
      );
    }
    case "health-contracts": {
      return (
        <DocumentPreviewContainer
          highlights={document.highlights || []}
          searchStrings={searchStrings}
          title={document.title}
          path={`/document/${document.index}/${document.id}`}
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
