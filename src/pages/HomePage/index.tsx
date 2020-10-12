import React from "react";
import PostList from "../../components/Post/PostList";
import { Box } from "@chakra-ui/core";
function HomePage() {
  return (
    <Box w="100%">
      <PostList />;
    </Box>
  );
}

export default HomePage;
