import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../../firebase'
import Card from '../Card'
import {PostProps} from '../../resources/models/PostProps'


//Mo phong mot array object
interface PostListProps extends Array<PostProps> {}

interface Props {
  post?: PostProps,
  postList?: PostListProps,
}

function PostList(props: Props) {
  const [loading, setLoading] = useState(true)
  const [postList, setPostList] = useState([])


 
  if (loading && !postList.length) {
    db.collection('post')
      .get()
      .then((snapshot: any) => {
        var posts = []
        snapshot.forEach((doc:any)=>{
          var eachDoc = doc.data()
          posts.push(eachDoc);
        }) 
        const newestFirst: any = posts.reverse()
        setPostList(newestFirst)
        setLoading(false)
      })
  }

  if (loading) {
    return <h1>Loading...</h1>
  }
  



  return (
    <>
      {postList.map((post) => (
        <section key={post.id}>
          <Link to={`/${post.slug}`}>
            <Card 
            title={post.title} 
            content={post.title} 
            cover_image={post.cover_image}  
            tag={post.tag_list} 
            author="NCL" 
            date={post.readable_publish_date} />
          </Link>

        </section>
      ))}
    </>
  )
}

export default PostList
