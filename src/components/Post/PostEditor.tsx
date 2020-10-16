import React, { useState, useCallback } from "react";
import { TagProps } from "../../resources/models/TagProps";
import { TagSelect } from "../Tags/TagSelect";
import * as Showdown from "showdown";
import { Text, Input, Flex, Box, Divider } from "@chakra-ui/core";

// Data
import {
  PostSettingRequest,
  PostContentRequest,
} from "../../resources/models/PostAPI";

import QuillEditor from "../Editors/QuillEditor";
import MdEditor from "../Editors/MdEditor";
import MarkdownView from "../Editors/MarkdownView";

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
    <Box mt={4} w="full">
      {/* <Sw checked={settings.canComment} onChange={handleCanCommentChange}>
        Có thể bình luận
      </Sw> */}
      <Text fontSize="lg" fontWeight="bold" color="blue.400">
        Add Tags
      </Text>
      <TagSelect
        fill
        value={props.tags}
        onChange={handleTagsChange}
        onSelect={(tag) => props.onTagSelect && props.onTagSelect(tag)}
        onRemove={(tag) => props.onTagRemove && props.onTagRemove(tag)}
      />
    </Box>
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
    <Flex
      direction="column"
      wrap="wrap"
      justify="flex-start"
      align="center"
      w="full"
      h="auto"
    >
      <Box w="full" mb={4}>
        <Input
          // focusBorderColor="true"
          name="title"
          // variant="flushed"
          value={subject}
          onChange={handleInputChange}
          placeholder="Tiêu đề bài viết"
        />
      </Box>

      <Flex
        w="full"
        direction="row"
        justify="start"
        align="start"
        flexWrap="wrap"
      >
        <Box w="45%" pr={2}>
          {/* <QuillEditor onChange={handleContentChange} initialValue={content} /> */}
          <MdEditor onChange={handleContentChange} initialValue={content} />
        </Box>
        <Divider
          orientation="vertical"
          borderColor="red.200"
          borderWidth="4px"
        />
        <Box w="45%" backgroundColor="gray.200" pl={2}>
          <MarkdownView source={content} />
        </Box>
      </Flex>
    </Flex>
  );
};
