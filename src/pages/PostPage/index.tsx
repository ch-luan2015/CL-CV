import React, { useState, useEffect } from "react";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import { RequestError } from "../../resources/api/helper";
import CodeBlock from "../../components/Editors/CodeBlock";
import Markdown from "react-markdown";
import { Box } from "@chakra-ui/core";

const PostPage = ({ match }: any) => {
  const [currentPost, setCurrentPost] = useState<PostProps>();
  const [error, setError] = useState<string>();

  const id = match.params.id;

  console.log("result");
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

  console.log("current", currentPost);
  return (
    <Box w="100%" backgroundColor="gray.100">
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
    </Box>
  );
};

export default PostPage;
