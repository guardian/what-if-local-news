import React from "react";
import { getDocument } from "../services/CouncillorService";
import { Document as TDocument } from "../services/documents";
import Document from "../Document";
import { useAsync } from "../hooks/useAsync";

type DocumentProps = {
  id: string;
  index: string;
};

const DocumentPage = ({ id, index }: DocumentProps) => {
  const [document] = useAsync(
    (index: string, id: string) => getDocument(index, id),
    null as TDocument | null | undefined,
    index,
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
