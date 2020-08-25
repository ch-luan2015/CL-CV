import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../../firebase'
import Card from '../Card'

export interface blogPost {
  content?: any
  coverImage?: any
  coverImageAlt?: any
  dateFormatted?: any
  datePretty?: any
  slug?: any
  title?: string
}

//Mo phong mot array object
interface blogPosts extends Array<blogPost> {}

interface Props {
  blogPost?: blogPost
  blogPosts?: blogPosts
}

function PostList(props: Props) {
  const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([])

  // db.collection('users')
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       var dbColl = doc.data()
  //       console.log('dvCol', dbColl.id)

  //       console.log(`${doc.id} => ${doc.data()}`)
  //     })
  //   })

  if (loading && !blogPosts.length) {
    db.collection('post')
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc)=>{
          let posts = []

          var eachDoc = doc.data()
          console.log('eachDoc',eachDoc)


          for (let slug in eachDoc) {
            posts.push(eachDoc[slug])
          }
          console.log('posts',posts)
          const newestFirst: any = posts.reverse()
          setBlogPosts(newestFirst)
          setLoading(false)
        }) 
      })
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      {blogPosts.map((blogPost: any) => (
        <section key={blogPost.slug}>
          <Link to={`/${blogPost.slug}`}>
            <Card title={blogPost.title} content={blogPost.title} coverImage={blogPost.cover_image}  tag="React" author="NCL" date={blogPost.readable_publish_date} />
          </Link>
        </section>
      ))}
    </>
  )
}

export default PostList
