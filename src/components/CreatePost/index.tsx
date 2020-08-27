import React, { useCallback, useMemo, useState, useEffect } from 'react'
import db from '../../firebase'
import RichTextEditor from '../Editors/Editor'
import { PostProps } from '../../resources/models/PostProps'


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
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];


function CreatePost() {
  // const [title, setTitle] = useState(' ')
  // const [collection_id, setCollection_id] = useState(null)
  // const [id, setId] = useState(null)
  // const [slug, setSlug] = useState('')
  // const [cover_image, setCover_image] = useState('')
  // const [content, setContent] = useState('')
  // const [tag_list, setTag_list] = useState(' ')

  const [content, setContent] = useState(JSON.stringify(initialValue));
  const [post, setPost] = useState<PostProps>(defaultPost)
  const [newPost, setNewPost] = useState<PostProps>({})


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
    //Du lieu dau vao lay tu form
    var date = generateDate()

    //Ham ket noi ghi du lieu len db

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
    setContent(content);
   
  };

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



