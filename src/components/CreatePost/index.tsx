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

function CreatePost(props: PostProps) {
  // const [title, setTitle] = useState(' ')
  // const [collection_id, setCollection_id] = useState(null)
  // const [id, setId] = useState(null)
  // const [slug, setSlug] = useState('')
  // const [cover_image, setCover_image] = useState('')
  // const [content, setContent] = useState('')
  // const [tag_list, setTag_list] = useState(' ')
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

  const handleInputChange = <P extends keyof PostProps>(name: P, value: PostProps[P],e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setPost({ ...post, [name]: value })
  }

  return (
    <div className="w-full  bg-gray-300">
      <section className="flex flex-col justify-start flex-wrap ">

      <div className="w-3/4 ">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          placeholder="title"
          value={post.title}
          onChange={(e) => {
            handleInputChange('title', e.target.value,e)
          }}
        />
        </div>
        

        <div className="w-3/4 ">
          <label htmlFor="content">Content</label>
          <input
            name="content"
            placeholder="content"
            type="text"
            value={post.content}
            onChange={(e) => {
              handleInputChange('content', e.target.value,e)
            }}
          />
        </div>


        <div className="w-3/4 ">
          <label htmlFor="content">Content</label>
           <DEditor/>
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


{/* 
        <input
          name="id"
          placeholder="id"
          value={post.id || ''}
          onChange={(e) => {
            handleInputChange('id', parseInt(e.target.value),e)
          }}
        /> */}

        {/* <input
          name="cover_image"
          type="text"
          value={post.cover_image}
          onChange={(e) => {
            handleInputChange('cover_image', e.target.value,e)
          }}
        /> */}
