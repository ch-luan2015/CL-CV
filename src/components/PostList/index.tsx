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
      <div className="w-full md:max-w-3xl px-4 text-normal text-gray-800 leading-normal" style={{ fontFamily: 'Georgia,serif' }}> 
        {blogPosts.map((blogPost:any) => ( 
        
           <section key={blogPost.slug}>
             <Card
               title={blogPost.title}
               content={blogPost.content}
               coverImage= {blogPost.coverImage}
               coverImageAlt={blogPost.coverImageAlt}
               tag="React"
               author="NCL"
               date={blogPost.datePretty}
             />
          </section>
        
        ))}

      
      </div>
    )
}


export default  PostList;
 
{/* <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} />
<div className="card-content">
  <h2>
    {blogPost.title} &mdash;
    <span style={{ color: "#5e5e5e" }}>{blogPost.datePretty}</span>
  </h2>
  <p
    dangerouslySetInnerHTML={{
      __html: `${blogPost.content.substring(0, 200)}...`
    }}
  ></p>
  <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
</div> */}
