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
  initialValue: string;
}

export const QuillEditorView = ({ initialValue }: QuillEditorView) => {
  console.log("initialValue", initialValue);

  const [stateView, setStateView] = useState({ value: initialValue });

  useEffect(() => {
    // const nodes = JSON.parse(initialValue);
    const nodes = initialValue;

    // console.log("nodes", nodes);
    setStateView({ value: nodes });
  }, [initialValue]);
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        readOnly={true}
        theme="snow"
        value={stateView.value}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export const QuillEditor = ({ onChange, initialValue }: QuillEditor) => {
  const [state, setState] = useState({ value: initialValue });

  const handleChange = (value) => {
    console.log("value handleChange", value);
    var data = value;
    console.log("data handleChange", data);

    setState({ value: data });
  };
  console.log("state", state.value);

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
