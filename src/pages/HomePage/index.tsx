import React from 'react'
import SideBar from '../../components/SideBar'
import PostList from '../../components/PostList'
import Card from '../../components/Card'


const blogPost1={
  title: "Your Travel Buddy",
  content: " Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.",
  coverImage: "https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg",
  coverImageAlt: "bag",
  tag: "React",
  author: "Luận",
  date: "March 10, 2020",
}
interface Props {}

function HomePage(props: Props) {
  return (
    <div className="max-w-screen-xl flex flex-row flex-wrap justify-center align-center">
       <div className="w-3/4 ">
       {/* flex flex-row flex-wrap justify-end align-center pr-5 */}
        <PostList/>
       

       </div>
        
      <div className="w-1/4 ">
          <SideBar/>
      </div>
    </div>
  )
}

export default HomePage;
