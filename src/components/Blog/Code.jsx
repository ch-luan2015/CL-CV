import React, { useState } from "react";
import PropTypes from "prop-types";
// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import { github, prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy, FaRegClipboard } from "react-icons/fa";
import {
  parentDiv,
  copyButton,
  copyButtonDark,
} from "../../stylesheets/components/Blog/Code.module.sass";

const Code = ({ children, language, isDark }) => {
  const [isCopied, setIsCopied] = useState(false);
  console.log("language",language)
  return (
    <div className={parentDiv}>
      <CopyToClipboard
        onCopy={() => setIsCopied(true)}
        className={`${copyButton} ${isDark && copyButtonDark}`}
        text={children}
      >
        <button type="button" aria-label="Copy to Clipboard Button">
          {isCopied ? <FaRegClipboard /> : <FaRegCopy />}
        </button>
      </CopyToClipboard>

      <SyntaxHighlighter language={language} style={isDark ? githubGist : githubGist}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

Code.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.string,
  isDark: PropTypes.bool.isRequired,
};

Code.defaultProps = {
  language: null,
};

export default Code;
