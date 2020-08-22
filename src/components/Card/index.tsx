import React from 'react'

interface Props {
  title?: string
  content?: any
  coverImage?: any
  coverImageAlt?: any
  tag?: any
  author?: any
  date?: any
}

const Card: React.FC<Props> = (props) => {
  console.log('props card', props.title)

  let subtitle = (props.content)?(props.content.substr(0,150)):('')
  return (
    <div className="md:flex shadow-lg mx-2 md:mx-auto my-10 max-w-lg md:max-w-3xl h-64 rounded-lg">
      <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={props.coverImage} alt={props.coverImageAlt} />
      <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
        <div className="flex items-center">
          <div className="text-black font-bold text-xl mb-2">{props.title}</div>
        </div>
        <p className="text-sm text-gray-700 mt-4">{subtitle+"..."}</p>

        <div className="flex items-center justify-end mt-4 top-auto">
          <div className="flex justify-center items-center">
            <a className="px-2 py-1 bg-blue-600  text-sm text-green-100 rounded ml-2" href="true">
              {props.tag}
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="w-8 h-8 object-cover rounded-full" alt="avatar" />
            <a className="text-gray-700 text-sm mx-3" href="true"></a>
          </div>
          <span className="font-light text-sm text-gray-600">{props.date}</span>
        </div>
      </div>
    </div>
  )
}
export default Card
