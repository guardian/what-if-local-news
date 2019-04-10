import React from "react";
import { Person as TPerson } from "./services/people";
import Link from "./routing/Link";

type PersonProps = {
  person: TPerson;
};

const Person = ({ person }: PersonProps) => (
  <div>
    <h4>
      <Link path={`/person/${person.id}`}>{person.name}</Link>
    </h4>
  </div>
);

export default Person;
