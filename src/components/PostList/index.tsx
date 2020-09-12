import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";

function PostList(props) {
  const [error, setError] = useState();
  const [postList, setPostList] = useState<PostProps[]>();

  useEffect(() => {
    postAPI.getPosts(0, 10, []).then((posts) => {
      setPostList(posts);
    });
  }, [postList]);

  return (
    <>
      {postList == undefined ? (
        <div className="text-center">Loading ... </div>
      ) : (
        postList.map((post: any) => (
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
