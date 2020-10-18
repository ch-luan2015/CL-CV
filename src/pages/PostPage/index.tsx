import React, { useState, useEffect } from "react";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import { RequestError } from "../../resources/api/helper";
import MarkdownView from "../../components/Editors/MarkdownView";
import { Box } from "@chakra-ui/core";

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
    <Box w="100%">
      {currentPost !== undefined ? (
        <Box textAlign="justify">
          <MarkdownView source={currentPost.content} />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default PostPage;
