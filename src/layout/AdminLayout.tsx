import React from "react";
import { Flex, Button, Image, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";
interface Props {
  preview?: boolean;
  children: React.ReactNode;
}

function AdminLayout({ children }: Props) {
  return (
    <Flex
      direction="row"
      wrap="wrap"
      justify="flex-start"
      alignItems="center"
      h="100vh"
    >
      <Flex
        flexDirection="row"
        w="100%"
        justify="space-between"
        alignItems="center"
        h="10%"
      >
        <Image
          src="https://uploads-ssl.webflow.com/5f17f616781ada06eddd5171/5f1931b1f08060971ababbfb_NeverSpam-logo.png"
          maxWidth="10%"
          ml={8}
        />

        <Flex w="100%" justify="flex-end">
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
      </Flex>

      <Flex
        width="100%"
        h="90%"
        direction="column"
        wrap="wrap"
        justify="flex-start"
        align="center"
        // backgroundColor="gray.100"
        borderRadius={8}
        shadow="6xl"
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default AdminLayout;
