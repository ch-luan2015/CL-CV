import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";
import Card from "../Card";
import PostSearch from "./PostSearch";

function PostList(props) {
  const [error, setError] = useState();
  const [posts, setPosts] = useState<PostProps[]>();

  useEffect(() => {
    postAPI.getPosts(0, 30, []).then((posts) => {
      setPosts(posts);
    });
  }, [setPosts]);

  return (
    <>
      {/* <Search /> */}
      <PostSearch />
      {posts == undefined ? (
        <div className="text-center">Loading ... </div>
      ) : (
        posts.map((post: any) => (
          <>
            {console.log("post", post)}
            <section key={post.id}>
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
            </section>
          </>
        ))
      )}
    </>
  );
}

export default PostList;
