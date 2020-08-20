import React, { useState, useEffect } from "react";
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

const Post = ({ match }:any) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<currentPost>({});

  const slug = match.params.slug;

  useEffect(() => {
    if (loading) {
      getFirebase()
        .database()
        .ref()
        .child(`/posts/${slug}`)
        .once("value")
        .then((snapshot:any) => {
          if (snapshot.val()) {
            setCurrentPost(snapshot.val());
          };
          setLoading(false);
        });
    }
    
  })


  
 

  return (
    <>
    {console.log("currentPost",currentPost)}
     <img src={currentPost.coverImage} alt={currentPost.coverImageAlt}/>
      <h1>{currentPost.title}</h1>
      <em>{currentPost.datePretty}</em>
      <p dangerouslySetInnerHTML={{ __html: currentPost.content }}></p> 
  
   </> 
  );
};

export default Post;

 
