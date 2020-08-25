import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { getFirebase } from '../../firebase'
import { useHistory } from 'react-router-dom'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import RichTextExample from '../Editors/Editor'
import DEditor from '../Editors/DEditor'


interface PostContentEditorProps {
  content: string;
  subject: string;
  onChange: () => void;
}


// Define a React component renderer for our code blocks.


function CreatePost(props: PostContentEditorProps) {
  const [title, setTitle] = useState(' ')
  const [slug, setSlug] = useState(' ')
  const [coverImage, setCoverImage] = useState(' ')
  const [coverImageAlt, setCoverImageAlt] = useState(' ')
  const history = useHistory()
  const [content, setContent] = useState('');
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState("")


  const createPost = () => {
    var date = generateDate()
    const newPost = {
      title,
      dateFormatted: date.formatted,
      datePretty: date.pretty,
      slug,
      coverImage,
      coverImageAlt,
      content,
    }

    getFirebase()
      .database()
      .ref()
      .child(`posts/${slug}`)
      .set(newPost)
      .then(() => history.push('/'))
  }

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




  return (
    <div className="w-full bg-gray-300">

{/* <RichTextExample/> */}

        <DEditor/>
    
    </div>
   
  )
}

export default CreatePost




{
  /* <>
<h1>Create a new post</h1>
<section style={{ margin: "2rem 0" }}>
  <label style={labelStyles} htmlFor="title-field">
    Title
  </label>
  <input
    style={inputStyles}
    id="title-field"
    type="text"
    value={title}
    onChange={({ target: { value } }) => {
      setTitle(value)
    }}
  />

  <label style={labelStyles} htmlFor="slug-field">
    Slug
  </label>
  <input
    style={inputStyles}
    id="slug-field"
    type="text"
    value={slug}
    onChange={({ target: { value } }) => {
      setSlug(value)
    }}
  />

  <label style={labelStyles} htmlFor="cover-image-field">
    Cover image
  </label>
  <input
    style={inputStyles}
    id="cover-image-field"
    type="text"
    value={coverImage}
    onChange={({ target: { value } }) => {
      setCoverImage(value)
    }}
  />

  <label style={labelStyles} htmlFor="cover-image-alt-field">
    Cover image alt
  </label>
  <input
    style={inputStyles}
    id="cover-image-alt-field"
    type="text"
    value={coverImageAlt}
    onChange={({ target: { value } }) => {
      setCoverImageAlt(value)
    }}
  />

  <label style={labelStyles} htmlFor="content-field">
    Content
  </label>
  <textarea
    style={{ ...inputStyles, height: 200, verticalAlign: "top" }}
    id="content"
    value={content}
    onChange={({ target: { value } }) => {
      setContent(value)
    }}
  />
  <div style={{ textAlign: "right" }}>
    <button
      style={{
        border: "none",
        color: "#fff",
        backgroundColor: "#039be5",
        borderRadius: "4px",
        padding: "8px 12px",
        fontSize: "0.9rem",
      }}
      onClick={createPost}
    >
      Create
    </button>
  </div>
</section> */
}
