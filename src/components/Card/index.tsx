import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCardProps } from "../../resources/models/PostCardProps";
import moment from "moment-timezone";
import "moment/locale/vi";
import * as Showdown from "showdown";

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
  const [imgP, setImgP] = useState();

  console.log("tag", props.tags);

  var imgRe = /https.*(png|jpg)/g;
  // var pRe = /https.*(png|jpg)/g;

  var resultImg = props.content.match(imgRe);
  var firtsImg = resultImg != null ? resultImg[0] : "";

  return (
    <div className="md:flex shadow-lg mx-2  md:mx-auto my-10 max-w-lg md:max-w-3xl rounded-lg relative h-40">
      <img
        className=" w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
        src={firtsImg != null ? firtsImg : ""}
        alt="new"
      />
      <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
        <div className="flex items-center ">
          <div className="text-black font-bold text-xl mb-2">
            {props.subject}
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-4">
          {subTitle.length > 1 ? subTitle + "..." : ""}
        </p>

        <div className="flex items-center justify-end absolute right-0 bottom-0 m-4">
          <div className="flex justify-center items-center">
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
          </div>
        </div>

        <div className="flex justify-between items-center absolute bottom-0 mb-2 block">
          <div className="flex items-center">
            <img
              src={require("../../assets/images/paleKing.jpg")}
              className="w-12 h-12 object-cover rounded-full"
              alt="avatar"
            />
            <span className="pl-2">{props.createdBy}</span>
            <Link to="#" className="text-gray-700 text-sm mx-3"></Link>
          </div>

          <span className="font-light text-sm text-gray-600">{local}</span>
        </div>
      </div>
    </div>
  );
};
export default Card;
