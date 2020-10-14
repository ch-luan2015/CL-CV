import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import Card from "../Card";
import PostSearch from "./PostSearch";
import { Button, useColorMode, Box, Flex, Image, Text } from "@chakra-ui/core";

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
    <Box
      maxWidth="1000px"
      // w={["90vw", "90vw", "90vw", "100vw"]}
      // direction={["row", "row", "column", "column"]}
    >
      {/* <PostSearch /> */}

      {posts === undefined ? (
        <div className="text-center">Loading ... </div>
      ) : (
        posts.map((post: any) => (
          <Box key={post.id} w="100%">
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
        ))
      )}

      {/* <Box p={4} display={{ md: "flex" }}>
        <Box>
          <Image
            rounded="lg"
            width={{ md: 40 }}
            src="https://bit.ly/2jYM25F"
            alt="Woman paying for a purchase"
          />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
          >
            Marketing
          </Text>

          <Text mt={2} color="gray.500">
            Getting a new business off the ground is a lot of hard work. Here
            are five ideas you can use to find your first customers.
          </Text>
        </Box>
      </Box> */}

      <Button
        mt={4}
        variantColor="blue"
        onClick={addPageRows}
        isLoading={isLoading}
      >
        Xem Thêm
      </Button>
    </Box>
  );
}

export default PostList;
