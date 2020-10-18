import React from "react";
import { Link } from "react-router-dom";
import { useColorMode, Button, Flex } from "@chakra-ui/core";
import styled from "@emotion/styled";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Container = ({ children }) => {
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
    <>
      <StickyNav
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        maxWidth="1280px"
        width="100%"
        bg={navBgColor[colorMode]}
        as="nav"
        p={4}
        mt={[0, 4]}
        mb={4}
        mx="auto"
      >
        {/* <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "dark" ? "sun" : "moon"}
          onClick={toggleColorMode}
        /> */}

        <Link to="/">
          <Button as="a" variant="ghost" p={[1, 4]}>
            Blogs
          </Button>
        </Link>
        <Link to="/about">
          <Button as="a" variant="ghost" p={[1, 4]}>
            About
          </Button>
        </Link>

        <Link to="/project">
          <Button as="a" variant="ghost" p={[1, 4]}>
            Một số sản phẩm của Lựng
          </Button>
        </Link>
        <Link to="/admin">
          <Button as="a" variant="ghost" p={[1, 4]}>
            Admin
          </Button>
        </Link>
      </StickyNav>
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        px={8}
      >
        {children}
      </Flex>
    </>
  );
};

export default Container;
