import React, { PureComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ value }) => {
  return (
    <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
