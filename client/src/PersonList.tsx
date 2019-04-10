import React from "react";
import { Person } from "./services/people";
import PersonPreview from "./PersonPreview";

type PersonListProps = {
  people: Person[];
};

const EnitityList = ({ people }: PersonListProps) => (
  <ol>
    {people.map(person => (
      <li key={person.id}>
        <PersonPreview person={person} />
      </li>
    ))}
  </ol>
);

export default EnitityList;
