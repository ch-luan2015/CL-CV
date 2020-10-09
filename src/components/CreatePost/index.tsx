import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/core";

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

const initialState: CreatePostRequest = {
  content: "",
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
        // history.push(routes.postUpdate.getPath(u.id));
      })
      .catch((e) => {
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

  return (
    <div className="w-full">
      <section className="flex flex-row justify-start flex-wrap ">
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

        <Button variantColor="blue" onClick={handleSave}>
          Lưu
        </Button>
      </section>
    </div>
  );
}

export default CreatePost;
