import React from "react";
import { useColorMode, Flex, Button, Image, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface Props {
  preview?: boolean;
  children: React.ReactNode;
}

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

function AdminLayout({ children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = {
    light: "white",
    dark: "gray.900",
  };
  const primarytextColor = {
    light: "black",
    dark: "white",
  };
  const navBgColor = {
    light: "rgba(255, 255, 255, 0.8)",
    dark: "rgba(23, 25, 35, 0.8)",
  };
  return (
    <Flex direction="column" justify="center" align="center">
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1280px"
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={2}
        mt={[0, 2]}
        mb={2}
        mx="auto"
      >
        <Link to="/">
          <Image
            src="https://uploads-ssl.webflow.com/5f17f616781ada06eddd5171/5f1931b1f08060971ababbfb_NeverSpam-logo.png"
            width="280px"
            height="auto"
            ml={8}
          />
        </Link>

        <Flex justify="center" align="center" direction="row">
          <Link to="/admin/post">
            <Button
              variant="ghost"
              leftIcon="plus-square"
              display="flex"
              justifyContent="flex-start"
            >
              Viết Bài
            </Button>
          </Link>

          <Link to="/admin/table">
            <Button
              variant="ghost"
              leftIcon="edit"
              display="flex"
              justifyContent="flex-start"
            >
              Quản lý bài viết
            </Button>
          </Link>
        </Flex>
      </StickyNav>

      <Flex
        direction="row"
        justify="flex-start"
        align="center "
        wrap="wrap"
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        borderRadius={4}
        shadow="6xl"
        maxWidth="1280px"
        width="100%"
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default AdminLayout;
