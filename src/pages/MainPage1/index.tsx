import React from 'react'
import Body from '../../components/Body'
import LeftBar from '../../components/LeftBar'

interface Props {}

function MainPage1(props: Props) {
  return (
    <div className="w-full">
        <LeftBar />
        <Body />
      <div className="w-1/4 h-12">
        <p>column 3</p>
      </div>
    </div>
  )
}

export default MainPage1
