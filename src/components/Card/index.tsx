import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "../../resources/models/PostCardProps";
import moment from "moment-timezone";
import "moment/locale/vi";
import * as Showdown from "showdown";
import { Box, Image, Stack, Tag, Avatar, Text, Flex } from "@chakra-ui/core";

import styles from "./card.module.scss";
const htmlToText = require("html-to-text");

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const Card: React.FC<PostCardProps> = (props) => {
  var local = moment.utc(props.createdAt).local().fromNow();
  const [subTitle, setSubtitle] = useState("");
  const [ImageP, setImageP] = useState();

  // console.log("html", html);
  // console.log("props.content: ", props.content);

  //Firts Paragap
  var ParaRe = /\*\*([^\*])*\n\*\*\n/g;
  var resultPara = props.content.match(ParaRe);
  // console.log("resultPara", resultPara);
  var firtsPara =
    resultPara != null ? resultPara[0].substr(2, resultPara[0].length - 4) : "";

  //Firts Image
  var ImageRe = /https.*(png|jpg)/g;
  var resultImage = props.content.match(ImageRe);
  var firtsImage = resultImage != null ? resultImage[0] : "";
  return (
    <Box p={4} display={{ sm: "flex", md: "flex" }} width="100%">
      <Box width={{ sm: 64, md: 64, lg: 56, xl: 56 }}>
        <Image
          rounded="lg"
          width={{ sm: 64, md: 64, lg: 56, xl: 56 }}
          src={firtsImage != null ? firtsImage : ""}
          alt="Image Thumbnail"
          objectFit="cover"
        />
      </Box>

      <Box
        ml={8}
        mt={{ base: 4, md: 0 }}
        width={{ sm: "100%", md: "100%", lg: "100%", xl: "100%" }}
        d="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Text
          mt={{ base: 4, md: 2 }}
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="wide"
          color="blue.400"
          w="100%"
        >
          {props.subject}
        </Text>
        <Text fontSize="sm" color="gray.700" mt={2}>
          {firtsPara !== null ? firtsPara + "..." : "..."}
        </Text>

        <Flex
          direction="row"
          justify="space-around"
          align="center"
          wrap="nowrap"
          mt={{ base: 4, md: 2 }}
        >
          <Avatar
            size="sm"
            name="Author"
            src={require("../../assets/images/paleKing.jpg")}
          />

          <Text
            fontSize="md"
            color="gray.700"
            pl={2}
            className={`${styles.author}`}
          >
            <Link to="#">{props.createdBy}</Link>
          </Text>

          <Box className={`${styles.hiddenText}`} pl={8}>
            -
          </Box>
          <Box mx={4}>
            {props.tags ? (
              <div className={`${styles.tagItem}`}>
                <Stack spacing={4} isInline>
                  {props.tags.map((tag) => (
                    <Tag size="sm" variantColor="gray">
                      {tag}
                    </Tag>
                  ))}
                </Stack>
              </div>
            ) : (
              ""
            )}
          </Box>

          <Box
            fontSize="sm"
            color="gray.600"
            borderRadius="lg"
            as="mark"
            textAlign="center"
          >
            {local}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default Card;
{
  /* 
        <Text mt={2} color="gray.500">
          {subTitle.length > 1 ? subTitle + "..." : "..."}
        </Text> */
}

{
  /* <Text fontSize="sm" color="gray.700" mt={2}>
          {subTitle.length > 1 ? subTitle + "..." : "..."}
        </Text> */
}
