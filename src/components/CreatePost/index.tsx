import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "@blueprintjs/core";

import { postAPI } from "../../resources/api/post";
import {
  CreatePostRequest,
  PostRestriction,
  PostContentRequest,
  PostSettingRequest,
} from "../../resources/models/PostAPI";
import { PostProps } from "../../resources/models/PostProps";
import { TagProps } from "../../resources/models/TagProps";

import {
  PostContentEditor,
  PostSettingEditor,
} from "../../components/Post/PostEditor";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const initialState: CreatePostRequest = {
  content: JSON.stringify(initialValue),
  subject: "",
  canComment: false,
  postRestrictionType: PostRestriction.NONE,
  accessUsers: [],
  tags: [],
};

function CreatePost() {
  const [request, setRequest] = useState<CreatePostRequest>(initialState);
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const history = useHistory();

  const handleSave = () => {
    postAPI
      .createPost(request)
      .then((u) => {
        if ((u = null)) return Promise.reject("ERROR");
        console.log(`post `);
        // history.push(routes.postUpdate.getPath(u.id));
      })
      .catch((e) => {
        console.log("ERROR", e);
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleContentChange = (content: PostContentRequest) => {
    setRequest((r) => ({ ...r, ...content }));
  };

  const handleSettingChange = (event: PostSettingRequest) => {
    setRequest(() => ({ ...request, canComment: !request.canComment }));
  };

  const handleTagsChange = (tags: string[]) => {
    setRequest((request) => ({ ...request, tags }));
  };

  // let output = identity<string>("myString");

  //handel InputChange la 1 anonymous function : handleInputChange<T>

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setPost({ ...post, [name]: value });
  // };

  // const handleContentChange = (content: string) => {
  //   setPost({ ...post, content });
  // };

  return (
    <div className="w-full">
      <section className="flex flex-col justify-start flex-wrap ">
        <div className="w-3/4 "></div>

        <PostContentEditor
          content={request.content}
          subject={request.subject}
          onChange={handleContentChange}
        />

        <PostSettingEditor
          tags={request.tags}
          settings={request}
          onSettingChange={handleSettingChange}
          onTagsChange={handleTagsChange}
        />

        <Button
          minimal
          intent="primary"
          icon={<Icon icon="floppy-disk" />}
          onClick={handleSave}
        >
          Lưu
        </Button>
      </section>
    </div>
  );
}

export default CreatePost;
