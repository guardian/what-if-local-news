import React from "react";

type PDFProps = {
  src: string;
};

const PDF = ({ src }: PDFProps) => {
  return (
    <iframe
      src={`/pdf/web/viewer.html?file=${src}`}
      style={{
        height: "100%",
        width: "100%"
      }}
    />
  );
};

export default PDF;
