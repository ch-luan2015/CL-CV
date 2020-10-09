import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import Card from "../Card";
import PostSearch from "./PostSearch";
import { Button } from "@chakra-ui/core";

function PostList(props) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageRows] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    postAPI.getPosts(0, pageRows, []).then((posts) => {
      setPosts((currentPosts) => [...currentPosts, ...posts]);
    });
  }, [pageRows]);

  const addPageRows = React.useCallback(() => {
    setIsLoading(true);
    postAPI
      .getPosts(pageIndex + 1, pageRows, [])
      .then((posts) => {
        setPosts((currentPosts) => [...currentPosts, ...posts]); //Ghép 2 mảng lại với nhau
        setPageIndex(pageIndex + 1);
      })
      .then(() => setIsLoading(false));
  }, [pageIndex, pageRows]);
  return (
    <div className="flex-1 overflow-y-auto">
      {/* <PostSearch /> */}

      {posts === undefined ? (
        <div className="text-center">Loading ... </div>
      ) : (
        posts.map((post: any) => (
          <div key={post.id}>
            <Link to={`blogs/${post.id}`}>
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
        <Button variantColor="blue" onClick={addPageRows} isLoading={isLoading}>
          Xem Thêm
        </Button>
      </div>
    </div>
  );
}

export default PostList;
