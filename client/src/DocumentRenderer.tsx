import React from "react";
import PDF from "./PDF";

type DocumentRendererProps = {
  document: {
    mimeType: string;
    src: string;
  };
};

const DocumentRenderer = ({ document }: DocumentRendererProps) => {
  switch (document.mimeType) {
    case "application/pdf": {
      return <PDF src={document.src} />;
    }
    default: {
      return <>Unable to render this file</>;
    }
  }
};

export default DocumentRenderer;
