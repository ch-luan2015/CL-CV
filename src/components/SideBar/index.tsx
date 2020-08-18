import React, {useState, useEffect} from "react";
import { useScript } from '../CustomHook/useScript';

interface Props {}

function LeftBar(props: Props) {

  const [loaded, error] = useScript("/bodyClick.js")

  useEffect(() => {
    if (!loaded) return
  })
  return (
    <div className="w-full flex flex-col justify-start items-start flex-wrap pt-10">

        <div className="w-full md:w-1/2 md:order-1 mb-10">
          <div className="max-w-md float-left md:text-left leading-loose tracking-tight md:sticky md:top-0 ">
            <p className="font-bold my-6 md:my-10 pt-2">Cấu trúc bài viết</p>
            <ul className="flex flex-wrap justify-between flex-col">
              <li>
                <a href="#" className="nav">
                  Previous blog posts links
                </a>
              </li>
              <li>
                <a href="#" className="nav">
                  A diam sollicitudin tempor id eue
                </a>
              </li>
              <li>
                <a href="#" className="nav">
                  Lectus vestibulum mattis ullamcorper velit sed ullamcorper
                </a>
              </li>
              <li>
                <a href="#" className="nav">
                  Pulvinar etiam non quam lacus suspendisse faucibus
                </a>
              </li>
            </ul>
            <a href="#" className="normal font-bold hover:font-bold">
              more...
            </a>
          </div>
        </div>

       
        <div className="w-full md:w-1/2 order-2 md:order-4 float-left md:text-left">
          <div className="max-w-md leading-loose tracking-tight">
            <p className="font-bold my-4 md:my-10">^_^ Về mình </p>
            <p className="mb-8">Arcu risus quis varius quam quisque id diam vel. Consectetur adipiscing elit ut aliquam purus sit amet. Nibh tortor id aliquet lectus proin nibh. </p>
          </div>
        </div>

        
        
       

     {/* <div className="absolute top-20 right-0 h-12 w-18 p-4">
        <button className="js-change-theme focus:outline-none">🌙</button>
      </div>  */}

     
</div>
      

  )
}

export default LeftBar
