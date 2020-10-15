import React from "react";

import { Box, Flex, Image } from "@chakra-ui/core";

const ImageBlock = ({
  alt,
  src,
  title,
}: {
  alt?: string;
  src?: string;
  title?: string;
}) => {
  return (
    <Image
      alt={alt}
      src={src}
      title={title}
      w="full"
      mx="auto"
      borderRadius={4}
      objectFit="cover"
      width="full"
      height="auto"
    />
  );
};

export default ImageBlock;
