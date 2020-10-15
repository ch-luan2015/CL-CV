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
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="1000px"
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
            <Flex
              direction="row"
              justify="flex-start"
              align="flex-end"
              alignContent="flex-end"
            >
              <Avatar
                size="sm"
                name="Author"
                src={require("../assets/images/paleKing.jpg")}
              />

              <Text fontSize="md" color="gray.700" pl={2} flex="1 1 auto">
                NCL
              </Text>
            </Flex>
          </Flex>
          <Box maxWidth="100%">{children}</Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export default BlogLayout;
