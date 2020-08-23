import React from 'react'
import SideBar from '../../components/SideBar'
import PostList from '../../components/PostList'



interface Props {}

function HomePage(props: Props) {
  return (
    <div className="max-w-screen-xl flex flex-row flex-wrap justify-center align-center">
       <div className="w-3/4 ">
        <PostList/>
       </div>
        
      <div className="w-1/4 ">
          <SideBar/>
      </div>
    </div>
  )
}

export default HomePage;
