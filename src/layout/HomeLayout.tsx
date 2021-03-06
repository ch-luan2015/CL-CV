import React, { useState } from "react";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
} from "@chakra-ui/core";
import Container from "../components/Container";

// eslint-disable-next-line import/no-unresolved, import/extensions
// import { frontMatter as blogPosts } from './blog/**/*.mdx';
// import { frontMatter as styleGuides } from './blog/style-guides-component-libraries-design-systems.mdx';
// import { frontMatter as stripeDesign } from './blog/how-stripe-designs-beautiful-websites.mdx';
// import { frontMatter as monorepo } from './blog/monorepo-lerna-yarn-workspaces.mdx';

const HomeLayout = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.700",
    dark: "gray.400",
  };

  //   const filteredBlogPosts = blogPosts
  //     .sort(
  //       (a, b) =>
  //         Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  //     )
  //     .filter((frontMatter) =>
  //       frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  //     );

  return (
    <Container>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="center"
        m="0 auto 4rem auto"
        maxWidth="1280px"
        w="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="1000px"
          w="100%"
        >
          <Heading w="100%" letterSpacing="tight" mb={2} as="h1" size="2xl">
            Blog
          </Heading>
          {/* <Text color={secondaryTextColor[colorMode]}>
            {`I've been writing online since 2014, mostly about web development and tech careers.
                In total, I've written  articles on this site.
                Use the search below to filter by title.`}
          </Text> */}
          <InputGroup my={4} mr={4} w="100%">
            <Input
              aria-label="Search articles"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
            />
            <InputRightElement>
              <Icon name="search" color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Flex>

        {/* Search Value */}
        {/* {!searchValue && (
            <Flex
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              maxWidth="700px"
              mt={8}
            >
              <Heading letterSpacing="tight" mb={8} size="xl" fontWeight={700}>
                Most Popular
              </Heading>
              <BlogPost {...styleGuides} />
              <BlogPost {...stripeDesign} />
              <BlogPost {...monorepo} />
            </Flex>
          )} */}

        <Flex
          flexDirection="column"
          justify="flex-start"
          align="flex-start"
          maxWidth="1000px"
          w="100%"
        >
          <Heading
            w="100%"
            letterSpacing="tight"
            mb={4}
            size="xl"
            fontWeight={700}
          >
            All Posts
          </Heading>
          {/* {!filteredBlogPosts.length && "No posts found."}
            {filteredBlogPosts.map((frontMatter) => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))} */}

          {children}
        </Flex>
      </Stack>
    </Container>
  );
};

export default HomeLayout;
