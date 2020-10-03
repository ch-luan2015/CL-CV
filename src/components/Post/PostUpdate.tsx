import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Button, Spinner, Icon } from "@blueprintjs/core";
import { postAPI } from "../../resources/api/post";
import {
  UpdatePostRequest,
  PostContentRequest,
  PostSettingRequest,
} from "../../resources/models/PostAPI";
import { PostSettingEditor, PostContentEditor } from "../Post/PostEditor";

type TParams = { id: string };
const PostUpdate = ({ match }: RouteComponentProps<TParams>) => {
  console.log("match", match);

  const [request, setRequest] = useState<UpdatePostRequest>();
  const [tags, setTags] = useState<string[]>();
  const [id, setId] = useState<number>();
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const history = useHistory();

  useEffect(() => {
    const id = Number(match.params.id);
    console.log("id", id);

    postAPI
      .getPost(id)
      .then((u) => {
        console.log("u", u);
        const request: UpdatePostRequest = {
          content: u.content,
          subject: u.subject,
          canComment: u.canComment,
          postRestrictionType: u.postRestrictionType,
          accessUsers: u.postAccessUsers,
        };
        setRequest(request);
        setTags(u.tags ?? []);
        setId(id);
      })
      .catch((err) => setAlert({ isOpen: true, message: err.message }));
  }, [match.params.id]);

  const handleContentChange = (content: PostContentRequest) => {
    setRequest((request) => (request ? { ...request, ...content } : request));
  };

  const handleSettingChange = (settings: PostSettingRequest) => {
    setRequest((request) => (request ? { ...request, ...settings } : request));
  };

  const handleSelect = (tag: string) => {
    if (id == null) return;
    postAPI.attachTag(id, tag).then(() => {
      setTags((tags) => [...(tags ?? []), tag]);
    });
  };

  const handleSave = () => {
    if (request == null || id == null) return;
    postAPI
      .updatePost(id, request)
      .then(() => {
        viewDetail();
      })
      .catch((e) => {
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleRemove = (tag: string) => {
    if (id == null) return;
    postAPI.detachTag(id, tag).then(() => {
      setTags((tags) =>
        tags?.reduce((pre, cur) => {
          if (cur === tag) return pre;
          return [...pre, cur];
        }, [] as string[])
      );
    });
  };

  const viewDetail = useCallback(() => {
    id && history.push(`/admin/update/${id}`);
  }, [id, history]);
  if (request == null || tags == null) {
    return <Spinner />;
  }
  return (
    <div className="w-full">
      <section className="flex flex-row justify-start flex-wrap ">
        <PostContentEditor
          content={request.content}
          subject={request.subject}
          onChange={handleContentChange}
        />

        <PostSettingEditor
          tags={tags}
          settings={request}
          onSettingChange={handleSettingChange}
          onTagSelect={handleSelect}
          onTagRemove={handleRemove}
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
      <p>Post Update {match}</p>
    </div>
  );
};

export default PostUpdate;
