import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "../../resources/models/PostCardProps";
import moment from "moment-timezone";
import "moment/locale/vi";
import * as Showdown from "showdown";
import { Box, Image, Text, Icon, Flex, Stack, Tag } from "@chakra-ui/core";

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
  // var pRe = /https.*(png|jpg)/g;

  var resultImage = props.content.match(ImageRe);
  var firtsImage = resultImage != null ? resultImage[0] : "";

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      mt={4}
      border="1px"
      borderRadius="lg"
      borderColor="gray.200"
      boxShadow="md"
      height="25vh"
    >
      <Image
        w="300px"
        h="100%"
        objectFit="cover"
        src={firtsImage != null ? firtsImage : ""}
        alt="new"
        borderRadius="lg"
      />

      <Box
        d="flex"
        flexDirection="row"
        w="100%"
        height="100%"
        p={4}
        textShadow="sm"
        flexWrap="wrap"
      >
        <Box w="80%">
          <Text fontSize="xl" fontWeight="bold">
            {props.subject}
          </Text>
        </Box>

        {/* <Text className="text-sm text-gray-700 mt-4">
          {subTitle.length > 1 ? subTitle + "..." : ""}
        </Text> */}

        <Box w="20%">
          {props.tags ? (
            <Stack spacing={4} isInline>
              {props.tags.map((tag) => (
                <Tag size="lg" variantColor="gray">
                  {tag}
                </Tag>
              ))}
            </Stack>
          ) : (
            " "
          )}
        </Box>

        <Box w="100%" h="50%" d="flex" flexDirection="row" flexWrap="nowrap">
          <Link to="#">
            <Image
              src={require("../../assets/images/paleKing.jpg")}
              rounded="full"
              size={12}
              alt="avatar"
            />

            <Text pl={2}>{props.createdBy}</Text>
          </Link>

          <Box>
            <Text as="mark">{local}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Card;
