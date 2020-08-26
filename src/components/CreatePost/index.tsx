import React, { useCallback, useMemo, useState, useEffect } from 'react'
import db from '../../firebase'
import { useHistory } from 'react-router-dom'
import DEditor from '../Editors/DEditor'
import { PostProps } from '../../resources/models/PostProps'


// interface PostContentEditorProps {
//   content: string;
//   subject: string;
//   onChange: (p: PostContentRequest) => void;
// }

// export const PostContentEditor = (props: PostContentEditorProps) => {
//   const [content, setContent] = useState(props.content);
//   const [subject, setSubject] = useState(props.subject);
//   const handleContentChange = (content: string) => {
//     setContent(content);
//     props.onChange({ content, subject });
//   };
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const subject = event.target.value;
//     setSubject(subject);
//     props.onChange({ content, subject });
//   };
//   return (
//     <div className="card-content">
//       <FormGroup label="Tiêu đề">
//         <InputGroup
//           style={{ width: "100%" }}
//           large
//           placeholder="Tiêu đề"
//           value={subject}
//           name="subject"
//           onChange={handleInputChange}
//         />
//       </FormGroup>
//       <FormGroup label="Nội dung">
//         <RichTextEditor onChange={handleContentChange} initialValue={content} />
//       </FormGroup>
//     </div>
//   );
// };

function CreatePost(props: PostProps) {
  const [title, setTitle] = useState(' ')
  const [collection_id, setCollection_id] = useState()
  const [id, setId] = useState()
  const [slug, setSlug] = useState(' ')
  const [cover_image, setCover_image] = useState(' ')
  const [description, setDescription] = useState(' ')
  const [content, setContent] = useState(' ')
  const [tag_list, setTag_list] = useState(' ')
  const history = useHistory()
  // const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState('')

  const createPost = () => {
    var date = generateDate()
    // const newPost = {
    //   title,
    //   dateFormatted: date.formatted,
    //   datePretty: date.pretty,
    //   slug,
    //   coverImage,
    //   coverImageAlt,
    //   content,
    // }

    const newPost: PostProps = {
      collection_id,
      id,
      description,
      cover_image,
      tag_list,
      title,
      content,
      created_at: date.pretty,
      published_at: date.pretty,
      slug,
    }

    // db()
    //   .database()
    //   .ref()
    //   .child(`posts/${slug}`)
    //   .set(newPost)
    //   .then(() => history.push('/'))
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
      <h1>Create a new post</h1>
      <section style={{ margin: '2rem 0' }}>
        <label htmlFor="title-field">Title</label>
        <input
          id="title-field"
          type="text"
          value={title}
          onChange={({ target: { value } }) => {
            setTitle(value)
          }}
        />
        
        <input
          name="id"
          placeholder="id"
          type="number"
          value={id}
          // onChange={({ target:  {value} }) => {
          //   setId(value)
          // }}
          onChange={
            (event: React.ChangeEvent<HTMLInputElement>)=>{
              console.log(event.target.value)
            }
          }
        />

        <input
          name="collection_id"
          placeholder="collection_id"
          type="number"
          value={collection_id}
          // onChange={({ target: { value } }) => {
          //   setCollection_id(value)
          // }}

          onChange={
            (event: React.ChangeEvent<HTMLInputElement>)=>{
              console.log(event.target.value)
            }
          }
        />

        <label htmlFor="slug-field">Slug</label>
        <input
          id="slug-field"
          type="text"
          value={slug}
          onChange={({ target: { value } }) => {
            setSlug(value)
          }}
        />

        <label htmlFor="cover-image-field">Cover image</label>
        <input
          id="cover-image-field"
          type="text"
          value={cover_image}
          onChange={({ target: { value } }) => {
            setCover_image(value)
          }}
        />

  
        <label htmlFor="content-field">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={({ target: { value } }) => {
            setContent(value)
          }}
        />
        <div style={{ textAlign: 'right' }}>
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
        </div>
      </section>

      {/* <DEditor/> */}
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
