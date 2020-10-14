import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "../../resources/models/PostCardProps";
import moment from "moment-timezone";
import "moment/locale/vi";
import * as Showdown from "showdown";
import {
  Box,
  Image,
  Text,
  Icon,
  Flex,
  Stack,
  Tag,
  Avatar,
} from "@chakra-ui/core";

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
      d="flex"
      flexDirection="row"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="space-between"
      mt={4}
      border="1px"
      borderRadius="lg"
      borderColor="gray.200"
      boxShadow="md"
      w="100%"
    >
      <Image
        w="30%"
        size="250px"
        objectFit="cover"
        src={firtsImage != null ? firtsImage : ""}
        alt="new"
        borderRadius="lg"
      />

      <Box
        backgroundColor="gray.300"
        d="flex"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="stretch"
        width="100%"
        h-full
        ml={4}
        textShadow="sm"
      >
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

        <Box w="100%">
          <Text fontSize="xl" fontWeight="bold" color="gray.900">
            {props.subject}
          </Text>
          <Text fontSize="sm" color="gray.700">
            {/* {subTitle.length > 1 ? subTitle + "..." : ""} */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            dolore amet praesentium cumque in eos, magni quibusdam perspiciatis
          </Text>
        </Box>

        <Box
          w="100%"
          d="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Box
            w="50%"
            d="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {/* <Link to="#" > */}
            <Avatar
              size="md"
              name="Author"
              src={require("../../assets/images/paleKing.jpg")}
            />

            <Text fontSize="md" color="gray.700" pl={4}>
              {props.createdBy}
            </Text>
            {/* </Link> */}
          </Box>

          <Box w="50%" textAlign="right" mr={8}>
            <Text fontSize="sm" color="gray.600" as="mark">
              {local}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Card;
