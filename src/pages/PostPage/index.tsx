import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import { RequestError } from "../../resources/api/helper";
import { QuillEditorView } from "../../components/Editors/QuillEditor";
import Layout from "../../layout";
import Container from "../../components/Container";
import MdEditor from "../../components/Editors/MdEditor";
import CodeBlock from "../../components/Editors/CodeBlock";
import Markdown from "react-markdown";

const PostPage = ({ match }: any) => {
  const [currentPost, setCurrentPost] = useState<PostProps>();
  const [error, setError] = useState<string>();

  const id = match.params.id;

  useEffect(() => {
    postAPI
      .getPost(id)
      .then((u) => {
        setCurrentPost(u);
      })
      .catch((e: RequestError) => {
        setError(e.message);
      });
  }, [id, setCurrentPost]);

  return (
    <div className="w-full">
      {currentPost !== undefined ? (
        // <div
        //   dangerouslySetInnerHTML={{ __html: `${currentPost.content}` }}
        // />

        // <ReactMarkDownView initialValue={currentPost.content} />
        <Markdown
          renderers={{ code: CodeBlock }}
          source={currentPost.content}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PostPage;
