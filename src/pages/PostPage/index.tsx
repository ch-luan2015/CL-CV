import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import { RequestError } from "../../resources/api/helper";
import { QuillEditorView } from "../../components/Editors/QuillEditor";
import Layout from "../../layout";
import Container from "../../components/Container";
import ReactMarkDown from "../../components/Editors/ReactMarkDown";

const Post = ({ match }: any) => {
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
  }, [setCurrentPost]);

  return (
    <Layout>
      <Container>
        <div className="flex flex-row flex-wrap justify-start align-left">
          <div className="w-4/5">
            {currentPost !== undefined ? (
              // <ReactMarkDown initialValue={currentPost.content} />
              <p>{currentPost.content}</p>
            ) : (
              ""
            )}

            {/* {currentPost !== undefined ? (
              <div
                dangerouslySetInnerHTML={{ __html: `${currentPost.content}` }}
              />
            ) : (
              ""
            )} */}
          </div>

          <div className="w-1/5 pl-12">
            <SideBar />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Post;
