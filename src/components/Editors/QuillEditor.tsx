import React, { useCallback, useMemo, useState, useEffect } from "react";
import hljs from "highlight.js";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/sunburst.css";

interface QuillEditor {
  onChange: (value: string) => void;
  initialValue: string;
}

interface QuillEditorView {
  initialValue: any;
}

export const QuillEditorView = ({ initialValue }: QuillEditorView) => {
  const [stateView, setState] = useState({ value: initialValue });

  useEffect(() => {
    setState({ value: initialValue });
  }, [initialValue]);
  const nodes: Node[] = JSON.parse(initialValue);
  return (
    <div className="text-editor">
      {/* <EditorToolbar /> */}
      <ReactQuill
        // theme="snow"
        value={stateView.value}
        // modules={modules}
        // formats={formats}
      />
    </div>
  );
};

export const QuillEditor = ({ onChange, initialValue }: QuillEditor) => {
  const [state, setState] = useState({ value: null });

  const handleChange = (value) => {
    console.log("state.value", value);

    setState({ value });
  };

  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillEditor;
