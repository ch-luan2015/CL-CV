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
  Flex,
  Divider,
  Image,
  Text,
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
    <Flex
      maxWidth="1000px"
      height="100%"
      direction="column"
      alignItems="stretch"
      w="100%"
    >
      {/* <PostSearch /> */}

      <Box>
        {posts === undefined ? (
          <div className="text-center">Loading ... </div>
        ) : (
          posts.map((post: any) => (
            <>
              <Box key={post.id} mt={4}>
                <Link to={`/blog/${post.id}`}>
                  <Card
                    id={post.id}
                    content={post.content}
                    subject={post.subject}
                    createdBy={post.createdBy}
                    createdAt={post.createdAt}
                    commentCount={post.commentCount}
                    tags={post.tags}
                  />
                </Link>
              </Box>
              <Divider />
            </>
          ))
        )}
      </Box>

      <Button
        mt={4}
        variantColor="blue"
        onClick={addPageRows}
        isLoading={isLoading}
        alignSelf="center"
        size="md"
        border="1px"
        borderRadius={4}
        borderColor="blue.400"
      >
        Xem Thêm
      </Button>
    </Flex>
  );
}

export default PostList;
