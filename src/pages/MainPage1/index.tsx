import React from 'react'
import Body from '../../components/Body'
import SideBar from '../../components/SideBar'

interface Props {}

function MainPage1(props: Props) {
  return (
    <div className="max-w-screen-xl flex flex-row flex-wrap justify-center align-center">
    
       <div className="w-3/4">
        <Body />
       </div>
        
      <div className="w-1/4 ">
          <SideBar/>
      </div>
    </div>
  )
}

export default MainPage1
