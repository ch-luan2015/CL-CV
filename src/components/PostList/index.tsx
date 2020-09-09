import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import db from '../../firebase'
import Card from '../Card'
import { PostProps } from '../../resources/models/PostProps'
import axios from 'axios'
import moment from 'moment'

interface PostListProps extends Array<PostProps> {}

interface Props {
  post?: PostProps
  postList?: PostListProps
}

function PostList(props: Props) {
  const [loading, setLoading] = useState(true)
  const [postList, setPostList] = useState([])

  useEffect(() => {
   const fetchData = async()=>{
     const response = await axios.get('https://api.linhtinh.tech/post')
     setPostList(response.data)
   }
   fetchData();
  },[])
  // if (loading && !postList.length) {
  //   db.collection('post')
  //     .get()
  //     .then((snapshot: any) => {
  //       var posts = []
  //       snapshot.forEach((doc: any) => {
  //         var eachDoc = doc.data()
  //         posts.push(eachDoc)
  //       })
  //       const newestFirst: any = posts.reverse()
  //       setPostList(newestFirst)
  //       setLoading(false)
  //     })
  // }

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
 
      {postList.map(post => (
        
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
  )
}

export default PostList
