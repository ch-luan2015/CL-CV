import React from 'react'
import Body from '../../components/Body'
import LeftBar from '../../components/LeftBar'

interface Props {}

function MainPage1(props: Props) {
  return (
    <div className="p-6 sm:p-10 md:p-16 flex flex-wrap">
        <LeftBar />
      <div className="w-full md:w-1/2 order-1 md:order-2">
        <div className="max-w-md leading-loose tracking-tight">
          <Body />
        </div>
      </div>
    </div>
  )
}

export default MainPage1
