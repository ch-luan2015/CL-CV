import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ value }) => {
  console.log("value", value);
  return (
    <SyntaxHighlighter
      language="jsx"
      style={githubGist}
      customStyle={{
        borderRadius: "4px",
        width: "auto",
        backgroundColor: "#F7FAFC",
        border: "1px solid #E2E8F0",
        padding: "4px",
        margin: "2%",
      }}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
