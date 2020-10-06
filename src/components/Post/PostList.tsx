import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import Card from "../Card";
import PostSearch from "./PostSearch";
import InfiniteScroll from "react-infinite-scroll-component";

function PostList(props) {
  const [error, setError] = useState();
  const [posts, setPosts] = useState<PostProps[]>();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageRows, setPageRows] = useState(2);
  useEffect(() => {
    postAPI.getPosts(0, pageRows, []).then((posts) => {
      setPosts(posts);
    });
  }, [pageRows]);

  const addPageRows = () => {
    return setPageRows(pageRows + 2);
  };
  return (
    <div className="flex-1 overflow-y-auto">
      {/* <PostSearch /> */}

      {posts == undefined ? (
        <div className="text-center">Loading ... </div>
      ) : (
        posts.map((post: any) => (
          <div key={post.id}>
            <Link to={`/${post.id}`}>
              <Card
                id={post.id}
                content={post.content}
                subject={post.subject}
                createdBy={post.createdBy}
                createdAt={post.createdAt}
                commentCount={post.commentCount}
                tags={post.tags}
              />
            </Link>
          </div>
        ))
      )}

      <div className="w-full text-center container">
        <button
          className="w-32  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={addPageRows}
        >
          Xem Thêm
        </button>
      </div>
    </div>
  );
}

export default PostList;
