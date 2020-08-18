import React from 'react'
import Body from '../../components/Body'
import LeftBar from '../../components/LeftBar'

interface Props {}

function MainPage1(props: Props) {
  return (
    <div className="w-full flex flex-row flex-wrap">
      <div className="w-1/4">
       <LeftBar />
      </div>
       <div className="w-2/4">
       <Body />
       </div>
        
      <div className="w-1/4 ">
        <p>column 3</p>
      </div>
    </div>
  )
}

export default MainPage1
