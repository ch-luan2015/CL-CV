import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
} from "@chakra-ui/core";
import { useOidcSecure } from "@axa-fr/react-oidc-context/dist/reactServices/OidcSecure";
import {
  AuthenticationProvider,
  useReactOidc,
} from "@axa-fr/react-oidc-context";
function ButtonLogin() {
  const initialFocusRef = React.useRef();
  const { login } = useReactOidc();
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button variant="ghost">Đăng bài</Button>
          </PopoverTrigger>
          <PopoverContent
            zIndex={4}
            color="white"
            bg="blue.800"
            borderColor="blue.800"
          >
            <PopoverHeader
              pt={4}
              fontWeight="bold"
              border="0"
              d="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              Đăng bài
              <Box w="4" h="4" color="red.500" borderColor="red.500" ml="2">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </Box>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverArrow />
            <PopoverBody>
              Mục đăng bài hiện nay chỉ dành cho Cộng tác viên, dần sẽ mở rộng.
              Cảm ơn các bạn đã quan tâm, love you.
            </PopoverBody>
            <PopoverFooter
              border="0"
              d="flex"
              alignItems="center"
              justifyContent="flex-end"
              pb={4}
            >
              <ButtonGroup size="sm">
                <Button
                  variantColor="blue"
                  onClick={onClose}
                  ref={initialFocusRef}
                >
                  Cancel
                </Button>

                <Button
                  variantColor="green"
                  ref={initialFocusRef}
                  onClick={() => login()}
                >
                  {/* <Link to="/admin">Login</Link> */}
                  Login
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default ButtonLogin;

{
  /* <Link to="/admin"> */
}
{
  /* <Button as="a" variant="ghost" p={[1, 4]} onClick={() => setIsOpen(true)}>
        Admin
      </Button> */
}
{
  /* </Link> */
}
{
  /* <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Đăng Bài
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex direction="row" justify="flex-start">
              Mục đăng bài hiện nay chỉ dành cho Cộng tác viên, dần sẽ mở rộng.
              Cảm ơn các bạn đã quan tâm, love you.
              <div className="w-4 h-4 text-red-600">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onClose} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */
}
