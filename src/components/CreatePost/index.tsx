import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { postAPI } from "../../resources/api/post";
import {
  CreatePostRequest,
  PostRestriction,
  PostContentRequest,
  PostSettingRequest,
} from "../../resources/models/PostAPI";
import RichTextEditor from '../Editors/Editor'
import { PostProps } from '../../resources/models/PostProps'
import { TagProps } from "../../resources/models/TagProps";


const defaultPost: PostProps = {
  collection_id: null,
  id: null,
  cover_image: '',
  tag_list: '',
  title: '',
  content: '',
  created_at: null,
  slug: '',
}


const initialValue = [
  {
    type: "paragraph",
    children: [{ text: '' }],
  },

];


function CreatePost() {
 

  //Parse nhan Json => JS
  //Stringify nhan Text => Json
  const [post, setPost] = useState<PostProps>(defaultPost)
  const [content, setContent] = useState(JSON.stringify(initialValue));//content gio la 1 string

  const generateDate = () => {
    const now: any = new Date()
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    if (month < 10) {
      month = `0${month}` // prepend with a 0
    }

    var day: any = now.getDate()
    if (day < 10) {
      day = `0${day}` // prepend with a 0
    }

    return {
      formatted: `${year}-${month}-${day}`, // used for sorting
      pretty: now.toLocaleDateString('en-US', options), // used for displaying
    }
  }

  const createPost = () => {
    var date = generateDate()


    // Add a new document with a generated id.
    db.collection('post')
      .add(post)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }

  // let output = identity<string>("myString");

  //handel InputChange la 1 anonymous function : handleInputChange<T>

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const {name,value}=e.target;
    setPost({ ...post, [name]: value })
  }

  const handleContentChange = (content: string) => {
    setPost({ ...post, content })
  };
  
  // console.log('post content', post.content)

  return (
    <div className="w-full  bg-gray-300">
      <section className="flex flex-col justify-start flex-wrap ">

      <div className="w-3/4 ">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          placeholder="title"
          value={post.title}
          onChange={handleInputChange}
        />
        </div>
       
        <div className="w-3/4 ">
          <label htmlFor="content">Content</label>
          <RichTextEditor onChange={handleContentChange} initialValue={content} />
        </div>
      

        <button
          style={{
            border: 'none',
            color: '#fff',
            backgroundColor: '#039be5',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '0.9rem',
          }}
          onClick={createPost}
        >
          Create
        </button>
      </section>

      
    </div>
  )
}

export default CreatePost



