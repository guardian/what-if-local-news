import React from "react";
import {
  DocumentWithPeopleAndPlaces,
  getDocument
} from "../services/CouncillorService";
import Document from "../Document";
import { useAsync } from "../hooks/useAsync";

type DocumentProps = {
  id: string;
};

const DocumentPage = ({ id }: DocumentProps) => {
  const [document] = useAsync(
    (id: string) => getDocument(id).then(res => res.results),
    null as DocumentWithPeopleAndPlaces | null | undefined,
    id
  );

  if (document === null) {
    return <>Loading ...</>;
  } else if (typeof document === "undefined") {
    return <>Not found</>;
  }

  return <Document document={document} />;
};

export default DocumentPage;
