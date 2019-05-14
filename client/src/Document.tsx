import React from "react";
import { Document as TDocument } from "./services/documents";
import styled from "styled-components";
import Link from "./routing/Link";
import PersonPreview from "./PersonPreview";
import DocumentRenderer from "./DocumentRenderer";
import GraphLayout from "./graph-layout/GraphLayout";
import Chip from "./Chip";
import Paper from "./Paper";

const Grid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  height: 100%;
  width: 100%;
`;

const GraphContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 210px);
  padding: 1em;
  width: 100%;
`;

const GraphTitle = styled.h2`
  margin: 0;
`;

const ResponsiveGraph = styled.div`
  height: 100%;
  min-height: 0;
  position: relative;
  width: 100%;
`;

const Pre = styled.pre`
  background-color: #fff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
  padding: 1em;
  white-space: pre-wrap;
`;

type DocumentContainerProps = {
  title: string;
  type: string;
  text: string;
  extra?: JSX.Element;
};

const DocumentContainer = ({
  title,
  type,
  text,
  extra
}: DocumentContainerProps) => {
  return (
    <Grid>
      <div>
        <h1>{title}</h1>
        <Chip label="type">{type}</Chip>
        <Pre>{text}</Pre>
        {extra}
      </div>
      <div>
        <GraphContainer>
          <GraphTitle>Entity graph</GraphTitle>
          <ResponsiveGraph>
            <GraphLayout
              style={{
                height: "100%",
                width: "100%"
              }}
              nodeSpecs={[
                ["a", ""],
                ["b", "Person B"],
                ["c", "Person C"],
                ["d", "Org D"],
                ["e", "Org E"],
                ["f", "Place F"],
                ["g", "Person G"]
              ]}
              edgeSpecs={[
                ["a", "b"],
                ["a", "c"],
                ["a", "d"],
                ["d", "e"],
                ["d", "f"],
                ["c", "g"]
              ]}
            />
          </ResponsiveGraph>
        </GraphContainer>
      </div>
    </Grid>
  );
};

type DocumentProps = {
  document: TDocument;
};

const Document = ({ document }: DocumentProps) => {
  switch (document.index) {
    case "planning-applications": {
      return (
        <DocumentContainer
          title="Planning application"
          type="Planning application"
          text={document.title}
        />
      );
    }
    case "council-petitions": {
      return (
        <DocumentContainer
          title={document.title}
          type="Petition"
          text={document.fields.description}
          extra={
            <>
              <h3>Signatures</h3>
              <ul>
                {document.fields.signatures.map(s => (
                  <li>{s}</li>
                ))}
              </ul>
            </>
          }
        />
      );
    }
    case "council-contracts": {
      return (
        <DocumentContainer
          title={document.title}
          type="Contract"
          text={document.fields.description}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default Document;
