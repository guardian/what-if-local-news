import React from "react";
import { Document as TDocument } from "./services/documents";
import styled from "styled-components";
import Link from "./routing/Link";
import PersonPreview from "./PersonPreview";
import DocumentRenderer from "./DocumentRenderer";

type DocumentProps = {
  document: TDocument;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
`;

const Document = ({ document }: DocumentProps) => {
  return <Grid>{document.title}</Grid>;
};

/*
<div>
<DocumentRenderer document={document} />
  <Link
    path={`/council/${document.councilId}`}
    style={{ color: "#9e5ace" }}
  >
    &laquo; Council
  </Link>
  <h2>{document.name}</h2>
  {document.text}
  <div>
    <h3>People</h3>
    {document.people.map(person => (
      <PersonPreview key={person.id} person={person} />
    ))}
  </div>
  <div>
    <h3>Places</h3>
    {document.places.map(place => (
      <h4 key={place.id}>
        <Link path={`/place/${place.id}`}>{place.name}</Link>
      </h4>
    ))}
  </div>
</div>
*/

export default Document;
