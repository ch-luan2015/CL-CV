import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "../../resources/models/PostCardProps";
import moment from "moment-timezone";
import "moment/locale/vi";
import * as Showdown from "showdown";
import { Box, Image, Text, Icon, Flex } from "@chakra-ui/core";

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
    <Box className="md:flex shadow-lg mx-2  md:mx-auto my-10 max-w-lg md:max-w-3xl rounded-lg relative h-40">
      <Image
        className=" w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
        src={firtsImage != null ? firtsImage : ""}
        alt="new"
      />
      <Box className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
        <Box className="flex items-center ">
          <Box className="text-black font-bold text-xl mb-2">
            {props.subject}
          </Box>
        </Box>
        <Text className="text-sm text-gray-700 mt-4">
          {subTitle.length > 1 ? subTitle + "..." : ""}
        </Text>

        <Box className="flex items-center justify-end absolute right-0 bottom-0 m-4">
          <Box className="flex justify-center items-center">
            {props.tags
              ? props.tags.map((tag) => {
                  return (
                    <Link
                      to="#"
                      className="px-2 py-1 bg-blue-600 text-sm text-green-100 rounded ml-2"
                    >
                      {tag}
                    </Link>
                  );
                })
              : " "}
          </Box>
        </Box>

        <Flex direction="row" alignItems="center" justify="between">
          <Flex direction="row" alignItems="center">
            <Image
              src={require("../../assets/images/paleKing.jpg")}
              rounded="full"
              size={12}
              alt="avatar"
            />
            <Text className="pl-2">{props.createdBy}</Text>
            <Link to="#" className="text-gray-700 text-sm mx-3"></Link>
          </Flex>

          <span className="font-light text-sm text-gray-600">{local}</span>
        </Flex>
      </Box>
    </Box>
  );
};
export default Card;
