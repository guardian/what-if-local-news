import React from "react";
import { Person as TPerson } from "../services/people";
import { getPerson } from "../services/CouncillorService";
import Person from "../Person";
import { useAsync } from "../hooks/useAsync";

type PersonPageProps = {
  id: string;
};

const PersonPage = ({ id }: PersonPageProps) => {
  const [person] = useAsync(
    (id: string) => getPerson(id).then(res => res.results),
    null as TPerson | null | undefined,
    id
  );

  if (person === null) {
    return <>Loading ...</>;
  } else if (typeof person === "undefined") {
    return <>Not found</>;
  }

  return <Person person={person} />;
};

export default PersonPage;
