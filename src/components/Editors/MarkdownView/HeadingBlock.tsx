import { Box, Text } from "@chakra-ui/core";
import React from "react";
// import { H1, H2, H3, H4, H5, H6 } from "./MyAmazingHeadings";

const HeadingBlock = (level, props) => {
  switch (level) {
    case 1:
      return <H1 {...props} />;
    case 2:
      return <H2 {...props} />;
    case 3:
      return <H3 {...props} />;
    case 4:
      return <H4 {...props} />;
    case 6:
      return <H5 {...props} />;
    case 5:
      return <H6 {...props} />;

    // default to H6 if you try to get a heading of level 0 or 7, as an example
    default:
      return <H6 {...props} />;
  }
};

export default HeadingBlock;
