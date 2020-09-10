import React, { useState, useCallback } from "react";

// Data
import {
  PostSettingRequest,
  PostContentRequest,
} from "../../resources/models/PostAPI";

import RichTextEditor from "../Editors/Editor";

export interface PostSettingEditorProps {
  onSettingChange: (request: PostSettingRequest) => void;
  onTagsChange?: (tags: string[]) => void;
  onTagSelect?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  tags: string[];
  settings: PostSettingRequest;
}

export const PostSettingEditor = (props: PostSettingEditorProps) => {
  const [settings, setSettings] = useState<PostSettingRequest>(props.settings);

  return <></>;
};

interface PostContentEditorProps {
  content: string;
  subject: string;
  onChange: (p: PostContentRequest) => void;
}

export const PostContentEditor = (props: PostContentEditorProps) => {
  const [content, setContent] = useState(props.content);
  const [subject, setSubject] = useState(props.subject);

  const handleContentChange = (content: string) => {
    setContent(content);
    props.onChange({ content, subject });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subject = event.target.value;
    setSubject(subject);
    props.onChange({ content, subject });
  };
  return (
    <div className="w-full  bg-gray-300">
      <section className="flex flex-col justify-start flex-wrap ">
        <div className="w-3/4 ">
          <label htmlFor="title">Tiêu đề bài viết</label>
          <input
            name="title"
            placeholder="Tiêu đề"
            value={subject}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-3/4 ">
          <label htmlFor="content">Nội dung </label>
          <RichTextEditor
            onChange={handleContentChange}
            initialValue={content}
          />
        </div>
      </section>
    </div>
  );
};
