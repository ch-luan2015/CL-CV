import React from "react";
import Markdown from "react-markdown";
import ImageBlock from "./ImageBlock";
import CodeBlock from "./CodeBlock";
import HeadingBlock from "./HeadingBlock";

interface Props {
  source?: string;
}
function MarkDownView({ source }: Props) {
  console.log("source", source);
  return (
    <Markdown
      renderers={{
        code: CodeBlock,
        image: ImageBlock,
        // heading: (source) => HeadingBlock(source.level),
      }}
      source={source}
    />
  );
}

export default MarkDownView;
