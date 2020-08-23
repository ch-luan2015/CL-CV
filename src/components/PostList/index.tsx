import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { getFirebase } from "../../firebase";
import Card from '../Card';


export interface blogPost{
      content ?: any,
      coverImage ?: any,
      coverImageAlt ?: any,
      dateFormatted ?:any,
      datePretty ?: any,
      slug ?: any,
      title ?: string

}


//Mo phong mot array object
interface blogPosts extends Array<blogPost>{}

interface Props{
  blogPost ?: blogPost;
  blogPosts?: blogPosts;
}

function PostList(props:Props){
    const [loading, setLoading] = useState(true);
    const [blogPosts, setBlogPosts] = useState([]);

    if (loading && !blogPosts.length) {
        getFirebase()
          .database()
          .ref("/posts")
          .orderByChild("dateFormatted")
          .once("value")
          .then((snapshot:any) => {
            let posts = [];
            const snapshotVal = snapshot.val();
            for (let slug in snapshotVal) {
              posts.push(snapshotVal[slug]);
            }
      
            const newestFirst:any = posts.reverse();
            setBlogPosts(newestFirst);
            setLoading(false);
          });
      }

      if (loading) {
        return <h1>Loading...</h1>;
      }

    return (
      <>
        {blogPosts.map((blogPost:any) => ( 
        
           <section key={blogPost.slug}>
             <Link to={`/${blogPost.slug}`}>
             <Card
               title={blogPost.title}
               content={blogPost.content}
               coverImage= {blogPost.coverImage}
               coverImageAlt={blogPost.coverImageAlt}
               tag="React"
               author="NCL"
               date={blogPost.datePretty}
             />
             </Link>
            
          </section>
        
        ))}

      </>
    )
}


export default  PostList;

