import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import Card from "../Card";
import PostSearch from "./PostSearch";
import {
  Button,
  useColorMode,
  Box,
  Heading,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/core";

function PostList(props) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageRows] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    postAPI.getPosts(0, pageRows, []).then((posts) => {
      setPosts((currentPosts) => [...currentPosts, ...posts]);
    });
  }, [pageRows]);

  const addPageRows = React.useCallback(() => {
    setIsLoading(true);
    postAPI
      .getPosts(pageIndex + 1, pageRows, [])
      .then((posts) => {
        setPosts((currentPosts) => [...currentPosts, ...posts]); //Ghép 2 mảng lại với nhau
        setPageIndex(pageIndex + 1);
      })
      .then(() => setIsLoading(false));
  }, [pageIndex, pageRows]);
  return (
    <Stack align="center" justify="center" mt={8} w="100%">
      {/* <PostSearch /> */}

      {posts === undefined ? (
        <Text className="text-center">Loading ... </Text>
      ) : (
        posts.map((post: any) => (
          <Link to={`/blog/${post.id}`} key={post.id}>
            {/* <Card
              id={post.id}
              content={post.content}
              subject={post.subject}
              createdBy={post.createdBy}
              createdAt={post.createdAt}
              commentCount={post.commentCount}
              tags={post.tags}
            /> */}
            <Box p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.subject}</Heading>
              <Text mt={4}>{post.subject}</Text>
            </Box>
          </Link>
        ))
      )}

      <Button variantColor="blue" onClick={addPageRows} isLoading={isLoading}>
        Xem Thêm
      </Button>
    </Stack>
  );
}

export default PostList;
