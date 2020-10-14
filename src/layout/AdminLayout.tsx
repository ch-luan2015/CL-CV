import React, { ReactNode } from "react";
import { Heading, Flex, Button, Image, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";
interface Props {
  preview?: boolean;
  children: React.ReactNode;
}

function AdminLayout({ children }: Props) {
  return (
    <Flex height="90vh">
      <Flex
        flexDirection="column"
        maxWidth={150}
        alignItems="center"
        justifyContent="flex-start"
        p={10}
      >
        <Image
          src="https://uploads-ssl.webflow.com/5f17f616781ada06eddd5171/5f1931b1f08060971ababbfb_NeverSpam-logo.png"
          maxWidth="100px"
        />
        <Flex
          flexDirection="column"
          height="100%"
          p={10}
          display="flex"
          justifyContent="space-between"
        >
          <Flex flexDirection="column">
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
          {/* <Button
            variant="ghost"
            leftIcon="settings"
            display="flex"
            justifyContent="flex-start"
          >
            Cài đặt
          </Button> */}
        </Flex>
      </Flex>
      <Flex
        width="100%"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="center"
        p="30px"
      >
        <Box
          width="100%"
          borderRadius={8}
          backgroundColor="gray.100"
          shadow="6xl"
          maxWidth="100%"
          height="auto"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default AdminLayout;
