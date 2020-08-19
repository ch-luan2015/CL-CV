import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { getFirebase } from "../../firebase";


export interface currentPost{
  content ?: any,
  coverImage ?: any,
  coverImageAlt ?: any,
  dateFormatted ?:any,
  datePretty ?: any,
  slug ?: any,
  title ?: any

}

interface Props{
  currentPost ?: currentPost;

}

const Post = ({ match }:any) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();

  const slug = match.params.slug;
  const postDoesNotExist = !currentPost;
  
  if (postDoesNotExist) {
    return <Redirect to="/404" />;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (loading && !currentPost) {
    getFirebase()
      .database()
      .ref()
      .child(`/posts/${slug}`)
      .once("value")
      .then((snapshot:any) => {
        if (snapshot.val()) {
          setCurrentPost(snapshot.val());
        }
        setLoading(false);
      });
  }

  return (
    <>
    {console.log("currentPost",currentPost)}
      {/* <img src={currentPost.coverImage} alt={currentPost.coverImageAlt}>
      <h1>{currentPost.title}</h1>
      <em>{currentPost.datePretty}</em>
      <p dangerouslySetInnerHTML={{ __html: currentPost.content }}></p>
    </img> */}
   </> 
  );
};

export default Post;
