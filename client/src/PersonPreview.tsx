import React from "react";
import { Person } from "./services/people";
import styled from "styled-components";
import Paper from "./Paper";
import Link from "./routing/Link";

type PersonPreviewProps = {
  person: Person;
};

const Card = styled(Paper)`
  align-items: center;
  display: inline-flex;
  margin: 0.25em;
  padding: 1em;
  justify-content: center;
`;

const PersonPreview = ({ person }: PersonPreviewProps) => (
  <Card>
    <Link path={`/person/${person.id}`}>{person.name}</Link>
  </Card>
);

export default PersonPreview;
