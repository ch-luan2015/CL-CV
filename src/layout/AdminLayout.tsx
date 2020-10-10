import React, { ReactNode } from "react";
import Header from "../components/Header";
import {
  Heading,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  Image,
} from "@chakra-ui/core";
interface Props {
  preview?: boolean;
  children: React.ReactNode;
}

function AdminLayout({ preview, children }: Props) {
  return (
    <Flex height="100vh">
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
          pt={10}
          display="flex"
          justifyContent="space-between"
        >
          <Flex flexDirection="column">
            <Button
              variant="ghost"
              leftIcon="at-sign"
              display="flex"
              justifyContent="flex-start"
            >
              Viết Bài
            </Button>
            <Button
              variant="ghost"
              leftIcon="email"
              display="flex"
              alignItems="center"
              flexDirection="row"
              justifyContent="flex-start"
            >
              Quản Lý
            </Button>
          </Flex>
          <Button
            variant="ghost"
            leftIcon="settings"
            display="flex"
            justifyContent="flex-start"
          >
            Cài đặt
          </Button>
        </Flex>
      </Flex>
      <Flex
        width="100%"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="space-around"
        p="30px"
      >
        <Flex alignItems="center" justifyContent="space-between" p="10px">
          <Heading>Đăng bài viết</Heading>
          <Button variantColor="green">Lưu</Button>
        </Flex>

        <Flex
          flexDirection="column"
          flexWrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
          p="30px"
          maxWidth="100%"
        >
          <Flex
            width="100%"
            borderRadius={25}
            backgroundColor="gray.100"
            shadow="6xl"
            maxWidth="100%"
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AdminLayout;
