import React, { useState, useCallback } from "react";
import { TagProps } from "../../resources/models/TagProps";
import { TagSelect } from "../Tags/TagSelect";
import * as Showdown from "showdown";
import { Text, Input } from "@chakra-ui/core";

// Data
import {
  PostSettingRequest,
  PostContentRequest,
} from "../../resources/models/PostAPI";

import QuillEditor from "../Editors/QuillEditor";
import MdEditor from "../Editors/MdEditor";
import Markdown from "react-markdown";
import CodeBlock from "../Editors/CodeBlock";

//Post setting
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

  const handleCanCommentChange = useCallback(() => {
    const newSettings = { ...settings, canComment: !settings.canComment };

    setSettings(newSettings);
    props.onSettingChange(newSettings);
  }, [props, settings]);

  const handleTagsChange = useCallback(
    (tags: TagProps[]) => {
      const tagStrs = tags.map((tag) => tag.value);
      props.onTagsChange && props.onTagsChange(tagStrs);
    },
    [props]
  );
  return (
    <>
      {/* <Sw checked={settings.canComment} onChange={handleCanCommentChange}>
        Có thể bình luận
      </Sw> */}
      <Text>Tags</Text>
      <TagSelect
        fill
        value={props.tags}
        onChange={handleTagsChange}
        onSelect={(tag) => props.onTagSelect && props.onTagSelect(tag)}
        onRemove={(tag) => props.onTagRemove && props.onTagRemove(tag)}
      />
    </>
  );
};

//Post content

interface PostContentEditorProps {
  subject: string;
  content: string;
  onChange: (p: PostContentRequest) => void;
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
export const PostContentEditor = (props: PostContentEditorProps) => {
  const [subject, setSubject] = useState(props.subject);
  const [content, setContent] = useState(props.content);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subject = event.target.value;
    setSubject(subject);
    props.onChange({ content, subject });
  };

  const handleContentChange = (content: string) => {
    // var convertData = converter.makeHtml(content);
    // console.log("convertData", convertData);
    setContent(content);
    props.onChange({ content, subject });
  };

  return (
    <div className="w-full">
      <section className="flex flex-col justify-start flex-wrap ">
        <div className="w-full mb-4">
          <Input
            // focusBorderColor="true"
            name="title"
            // variant="flushed"
            value={subject}
            onChange={handleInputChange}
            placeholder="Tiêu đề bài viết"
          />
        </div>

        <div className="w-full flex flex-row justify-center align-middle ">
          <div className="w-1/2 pr-2">
            {/* <QuillEditor onChange={handleContentChange} initialValue={content} /> */}
            <MdEditor onChange={handleContentChange} initialValue={content} />
          </div>
          <div className="w-1/2 pl-2 text-align">
            <Markdown source={content} renderers={{ code: CodeBlock }} />
          </div>
        </div>
      </section>
    </div>
  );
};
