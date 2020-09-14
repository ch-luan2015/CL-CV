import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";

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
      {posts == undefined ? (
        <div className="text-center">Loading ... </div>
      ) : (
        posts.map((post: any) => (
          <section key={post.id}>
            <Link to={`/${post.id}`}>
              <Card
                title={post.subject}
                content={post.content}
                // cover_image={post.cover_image}
                tag={post.tags}
                author={post.createdBy}
                date={post.createdAt}
              />
            </Link>
          </section>
        ))
      )}
    </>
  );
}

export default PostList;
