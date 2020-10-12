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
    <Box width="100%">
      <Flex
        width="100%"
        alignItems="stretch"
        justifyContent="flex-start"
        flexDirection="column"
      >
        {/* <PostSearch /> */}

        {posts === undefined ? (
          <Text className="text-center">Loading ... </Text>
        ) : (
          posts.map((post: any) => (
            <>
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
                <Box mb={8} display="block" width="100%">
                  <Heading size="md" as="h3" mb={2} fontWeight="medium">
                    {post.subject}
                  </Heading>
                  <Text
                    color="gray.500"
                    minWidth="105px"
                    textAlign={["left", "right"]}
                    mb={[4, 0]}
                  >
                    Views
                  </Text>
                  <Text>{post.subject}</Text>
                </Box>
              </Link>

              <Card
                id={post.id}
                content={post.content}
                subject={post.subject}
                createdBy={post.createdBy}
                createdAt={post.createdAt}
                commentCount={post.commentCount}
                tags={post.tags}
              />
            </>
          ))
        )}
      </Flex>
      <Button
        variantColor="blue"
        onClick={addPageRows}
        isLoading={isLoading}
        mx="40%"
        width="20%"
      >
        Xem Thêm
      </Button>
    </Box>
  );
}

export default PostList;
