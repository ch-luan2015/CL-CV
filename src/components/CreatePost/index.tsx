import React, { useCallback, useMemo, useState, useEffect } from 'react'
import db from '../../firebase'
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
  const [collection_id, setCollection_id] = useState(null)
  const [id, setId] = useState(null)
  const [slug, setSlug] = useState('')
  const [cover_image, setCover_image] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [tag_list, setTag_list] = useState(' ')
  const [newPost, setNewPost]=useState<PostProps>({});

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
 
    var newPost: PostProps = {
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

    //Ham ket noi ghi du lieu len db

    // Add a new document with a generated id.
    db.collection('post')
      .add(newPost)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const newValue = event.currentTarget.value;
        console.log('newValue',newValue)
        // setNewPost({subject});
    //     props.onChange({ content, subject });
    //   };
    

  }


  return (
    <div className="w-full bg-gray-300">
      <h1>Create a new post</h1>
      <section style={{ margin: '2rem 0' }}>
        <label htmlFor="title-field">Title</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={handleInputChange}
        />

        <input
          name="id"
          placeholder="id"
          type="number"
          value={id}
          onChange={handleInputChange}
        />

        {/* <input
          name="collection_id"
          placeholder="collection_id"
          type="number"
          value={collection_id}
       
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCollection_id(event.target.value)
          }}
        /> */}

        {/* <label htmlFor="slug-field">Slug</label>
        <input
          id="slug-field"
          type="text"
          value={slug}
          onChange={({ target: { value } }) => {
            setSlug(value)
          }}
        /> */}

        <label htmlFor="cover_image">Cover image</label>
        <input
          name="cover_image"
          type="text"
          value={cover_image}
          onChange={handleInputChange}
        />

        <label htmlFor="content-field">Content</label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={handleInputChange}
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


//   <>
// <h1>Create a new post</h1>
// <section style={{ margin: "2rem 0" }}>
//   <label style={labelStyles} htmlFor="title-field">
//     Title
//   </label>
//   <input
//     style={inputStyles}
//     id="title-field"
//     type="text"
//     value={title}
//     onChange={({ target: { value } }) => {
//       setTitle(value)
//     }}
//   />

//   <label style={labelStyles} htmlFor="slug-field">
//     Slug
//   </label>
//   <input
//     style={inputStyles}
//     id="slug-field"
//     type="text"
//     value={slug}
//     onChange={({ target: { value } }) => {
//       setSlug(value)
//     }}
//   />

//   <label style={labelStyles} htmlFor="cover-image-field">
//     Cover image
//   </label>
//   <input
//     style={inputStyles}
//     id="cover-image-field"
//     type="text"
//     value={coverImage}
//     onChange={({ target: { value } }) => {
//       setCoverImage(value)
//     }}
//   />

//   <label style={labelStyles} htmlFor="cover-image-alt-field">
//     Cover image alt
//   </label>
//   <input
//     style={inputStyles}
//     id="cover-image-alt-field"
//     type="text"
//     value={coverImageAlt}
//     onChange={({ target: { value } }) => {
//       setCoverImageAlt(value)
//     }}
//   />

//   <label style={labelStyles} htmlFor="content-field">
//     Content
//   </label>
//   <textarea
//     style={{ ...inputStyles, height: 200, verticalAlign: "top" }}
//     id="content"
//     value={content}
//     onChange={({ target: { value } }) => {
//       setContent(value)
//     }}
//   />
//   <div style={{ textAlign: "right" }}>
//     <button
//       style={{
//         border: "none",
//         color: "#fff",
//         backgroundColor: "#039be5",
//         borderRadius: "4px",
//         padding: "8px 12px",
//         fontSize: "0.9rem",
//       }}
//       onClick={createPost}
//     >
//       Create
//     </button>
//   </div>
//     </section> 
