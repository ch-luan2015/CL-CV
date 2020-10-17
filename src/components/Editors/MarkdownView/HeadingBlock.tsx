import { Heading } from "@chakra-ui/core";
import React from "react";

const HeadingBlock = (level, props) => {
  switch (level) {
    case 1:
      return (
        <Heading as={level} size="2xl">
          {props}
        </Heading>
      );
    case 2:
      return (
        <Heading as={level} size="xl">
          {props}
        </Heading>
      );
    // case 3:
    //   return (
    //     <Heading as="h3" size="lg">
    //       {props}
    //     </Heading>
    //   );
    // case 4:
    //   return (
    //     <Heading as="h4" size="md">
    //       {props}
    //     </Heading>
    //   );
    // case 6:
    //   return (
    //     <Heading as="h5" size="sm">
    //       {props}
    //     </Heading>
    //   );
    // case 5:
    //   return (
    //     <Heading as="h6" size="sm">
    //       {props}
    //     </Heading>
    //   );

    // default to H6 if you try to get a heading of level 0 or 7, as an example
    default:
      return (
        <Heading as={level} size="sm">
          {props}
        </Heading>
      );
  }
};

export default HeadingBlock;
