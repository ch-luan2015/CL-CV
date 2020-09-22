import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { PostProps } from "../../resources/models/PostProps";
import { RichTextViewer } from "../../components/Editors/Editor";
import { postAPI } from "../../resources/api/post";
import { RequestError } from "../../resources/api/helper";
import { QuillEditorView } from "../../components/Editors/QuillEditor";

const Post = ({ match }: any) => {
  const [currentPost, setCurrentPost] = useState<PostProps>();
  const [error, setError] = useState<string>();

  const id = match.params.id;

  useEffect(() => {
    postAPI
      .getPost(id)
      .then((u) => {
        setCurrentPost(u);
      })
      .catch((e: RequestError) => {
        setError(e.message);
      });
  }, [setCurrentPost]);

  return (
    <div className="max-w-screen-xl flex flex-row flex-wrap justify-center align-center">
      <div className="w-3/4 flex flex-row flex-wrap justify-end align-center pr-5">
        <div className="w-full md:max-w-3xl mx-auto pt-10 bg-gray-100">
          <div
            className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
            style={{ fontFamily: "Georgia,serif" }}
          >
            <div className="font-sans">
              <span className="text-base md:text-sm text-teal-500 font-bold">
                <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
                  Welcome to Minimal Blog
                </h1>
                <p className="text-sm md:text-base font-normal text-gray-600">
                  Published 19 February 2019
                </p>
              </span>
            </div>
            {console.log("currentPost", currentPost)}

            <ol>
              <li className="py-2">
                {currentPost !== undefined ? (
                  <QuillEditorView initialValue={currentPost.content} />
                ) : (
                  ""
                )}

                {/* <RichTextViewer initialValue={currentPost.content} /> */}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="w-1/4 ">
        <SideBar />
      </div>
    </div>
  );
};

export default Post;
