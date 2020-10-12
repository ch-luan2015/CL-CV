import React from "react";
import {
  useColorMode,
  Text,
  Flex,
  Stack,
  Avatar,
  Link,
  Box,
} from "@chakra-ui/core";

import Container from "../components/Container";
// import Subscribe from '../components/Subscribe';
// import ViewCounter from '../components/ViewCounter';
// import BlogSeo from '../components/BlogSeo';

function BlogLayout({ children }) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  return (
    <Container>
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="1280px"
        w="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="1280px"
          w="100%"
        >
          <Flex
            justify="space-between"
            align={["initial", "center"]}
            direction={["column", "row"]}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Avatar
                size="md"
                name="NCL"
                src={require("../assets/images/Pale-King.png")}
                mr={2}
              />
              <Text fontSize="sm" color={textColor[colorMode]}>
                {"NCL"}
              </Text>
            </Flex>
          </Flex>
          {children}
        </Flex>
      </Stack>
    </Container>
  );
}

export default BlogLayout;
