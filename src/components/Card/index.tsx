import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "../../resources/models/PostCardProps";
import moment from "moment-timezone";
import "moment/locale/vi";
import * as Showdown from "showdown";
import { Box, Image, Stack, Tag, Avatar, Text, Flex } from "@chakra-ui/core";

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

  var ImageRe = /https.*(png|jpg)/g;

  var resultImage = props.content.match(ImageRe);
  var firtsImage = resultImage != null ? resultImage[0] : "";
  return (
    <Box p={4} display={{ md: "flex" }} width="100%">
      <Box>
        <Image
          rounded="lg"
          width={{ md: 40 }}
          src={firtsImage != null ? firtsImage : ""}
          alt="Image Thumbnail"
          objectFit="cover"
        />
      </Box>
      <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
        <Box w="100%">
          {props.tags ? (
            <Stack spacing={4} isInline>
              {props.tags.map((tag) => (
                <Tag size="md" variantColor="gray">
                  {tag}
                </Tag>
              ))}
            </Stack>
          ) : (
            ""
          )}
        </Box>
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="sm"
          letterSpacing="wide"
          color="blue.600"
        >
          {props.subject}
        </Text>

        <Text mt={2} color="gray.500">
          {/* {subTitle.length > 1 ? subTitle + "..." : "..."} */}
        </Text>
        <Flex direction="row" justify="flex-start" align="flex-end">
          <Avatar
            size="sm"
            name="Author"
            src={require("../../assets/images/paleKing.jpg")}
          />
          {/* <Link to="#"> */}
          <Text fontSize="md" color="gray.700" pl={4} flex="1 1 auto">
            {props.createdBy}
          </Text>
          {/* </Link> */}
          <Text fontSize="sm" color="gray.600" as="mark" align-self="end">
            {local}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
export default Card;
