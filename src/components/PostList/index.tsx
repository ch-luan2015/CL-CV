import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import { PostProps } from "../../resources/models/PostProps";
import { postAPI } from "../../resources/api/post";

interface PostListProps extends Array<PostProps> {}

interface Props {
  post?: PostProps;
  postList?: PostListProps;
}

function PostList(props: Props) {
  const [error, setError] = useState();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
  
    postAPI
    .getPost()
    .then((u)=>{})
    .catch((e)=>{})
  }

  return (
    <>
      {postList.map((post) => (
        <section key={post.id}>
          <Link to={`/${post.id}`}>
            <Card
              title={post.subject}
              content={post.content}
              cover_image={post.cover_image}
              tag={post.tags}
              author={post.createdBy}
              date={post.createdAt}
            />
          </Link>
        </section>
      ))}
    </>
  );
}

export default PostList;
