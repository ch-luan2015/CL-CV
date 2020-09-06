import React, { useState, useEffect } from 'react'
import db from '../../firebase'
import SideBar from '../../components/SideBar'
import { Link } from 'react-router-dom'
import { PostProps } from '../../resources/models/PostProps'
import { RichTextViewer } from '../../components/Editors/Editor'



const Post = ({ match }: any) => {
  const [loading, setLoading] = useState(true)
  const [currentPost, setCurrentPost] = useState<PostProps>({})

  const title = match.params.title

  useEffect(() => {
    if (loading) {
      db.collection('post')
        .where('title', '==', `${title}`)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setCurrentPost(doc.data())
          })
          setLoading(false)
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    }
  })



  return (
    <div className="max-w-screen-xl flex flex-row flex-wrap justify-center align-center">
      <div className="w-3/4 flex flex-row flex-wrap justify-end align-center pr-5">
        <div className="w-full md:max-w-3xl mx-auto pt-10 bg-gray-100">
          <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal" style={{ fontFamily: 'Georgia,serif' }}>
            <div className="font-sans">
              <span className="text-base md:text-sm text-teal-500 font-bold">
                <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">Welcome to Minimal Blog</h1>
                <p className="text-sm md:text-base font-normal text-gray-600">Published 19 February 2019</p>
              </span>
            </div>

            <div className="py-6">
              <img src={currentPost.cover_image} alt="new" />
              {/* <h1>{currentPost.title}</h1> */}
              {/* <em>{currentPost.datePretty}</em> */}
            </div>
            <ol>
              <li className="py-2">
                <RichTextViewer initialValue={currentPost.content} />
              </li>
       
              <li className="py-3">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc vitae pretium elit. Cras leo mauris, tristique in risus ac, tristique rutrum velit. Mauris accumsan tempor felis vitae gravida. Cras egestas convallis malesuada. Etiam ac ante id tortor
                vulputate pretium. Maecenas vel sapien suscipit, elementum odio et, consequat tellus.
              </li>
            </ol>
            <blockquote className="border-l-4 border-teal-500 italic my-8 pl-8 md:pl-12">Example of blockquote - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.</blockquote>
            <p className="py-6">Example code block:</p>
            <pre className="bg-gray-900 rounded text-white font-mono text-base p-2 md:p-4">
              {'\t'}
              {'\t'}
              {'\t'}
              {'\t'}
              <code className="break-words whitespace-pre-wrap">
                {'\n'}
                {'            '}&lt;header class="site-header outer"&gt;{'\n'}
                {'            '}&lt;div class="inner"&gt;{'\n'}
                {'            '}
                {'{'}
                {'{'}&gt; "site-nav"{'}'}
                {'}'}
                {'\n'}
                {'            '}&lt;/div&gt;{'\n'}
                {'            '}&lt;/header&gt;{'\n'}
                {'\t'}
                {'\t'}
                {'\t'}
                {'\t'}
              </code>
              {'\n'}
              {'\t'}
              {'\t'}
              {'\t'}
            </pre>
          </div>
          <div className="text-base md:text-sm text-gray-500 px-4 py-6">
            Tags:
            <a href="#" className="text-base md:text-sm text-teal-500 no-underline hover:underline">
              Link
            </a>
            .
            <a href="#" className="text-base md:text-sm text-teal-500 no-underline hover:underline">
              Link
            </a>
          </div>

          <div className="flex w-full items-center font-sans px-4 py-12">
            <img className="w-10 h-10 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of Author" />
            <div className="flex-1 px-2">
              <p className="text-base font-bold text-base md:text-xl leading-none mb-2">Jo Bloggerson</p>
              <p className="text-gray-600 text-xs md:text-base">
                Minimal Blog Tailwind CSS template by
                <a className="text-teal-500 no-underline hover:underline" href="https://www.tailwindtoolbox.com">
                  TailwindToolbox.com
                </a>
              </p>
            </div>
            <div className="justify-end">
              <button className="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">Read More</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4 ">
        <SideBar />
      </div>
    </div>
  )
}

export default Post
