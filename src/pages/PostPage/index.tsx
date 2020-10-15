import React, { useState, useEffect } from "react";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import { RequestError } from "../../resources/api/helper";
import CodeBlock from "../../components/Editors/CodeBlock";
import Markdown from "react-markdown";
import { Box, Flex } from "@chakra-ui/core";
import ImageBlock from "../../components/Editors/ImageBlock";

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

  // console.log("current", currentPost !== undefined ? currentPost.content : "");
  return (
    <Box w="100%">
      {currentPost !== undefined ? (
        <Box textAlign="justify">
          <Markdown
            renderers={{
              code: CodeBlock,
              image: ImageBlock,
            }}
            source={currentPost.content}
          />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default PostPage;
