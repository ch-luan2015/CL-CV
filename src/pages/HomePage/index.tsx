import React from 'react'
import SideBar from '../../components/SideBar'
import PostList from '../../components/PostList'
import Card from '../../components/Card'



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
