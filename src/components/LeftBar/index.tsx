import React from 'react'

interface Props {}

function LeftBar(props: Props) {
  return (
    <div className="w-1/4 h-12">
        <div className="w-full md:w-1/2 md:pr-32 md:order-1">
          <div className="max-w-md md:float-right md:text-right leading-loose tracking-tight md:sticky md:top-0 ">
            <p className="font-bold my-4 md:my-12">Previous Posts</p>
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

       

        <div className="w-full md:w-1/2 md:pr-32 pt-12 md:pt-0 md:sticky md:bottom-0 order-4 md:order-3">
          <div className="max-w-md md:float-right md:text-right leading-loose tracking-tight md:mb-16">
            <p className="font-bold my-4 md:my-12">Contact Me</p>
            <ul className="flex flex-wrap justify-between flex-row md:flex-col">
              <li>
                <a href="#" className="nav mx-2 md:mx-0">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="nav mx-2 md:mx-0">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="nav mx-2 md:mx-0">
                  Dribbble
                </a>
              </li>
              <li>
                <a href="#" className="nav mx-2 md:mx-0">
                  etc
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-2 md:order-4">
          <div className="max-w-md leading-loose tracking-tight">
            <p className="font-bold my-4 md:my-12">About Me</p>
            <p className="mb-8">Arcu risus quis varius quam quisque id diam vel. Consectetur adipiscing elit ut aliquam purus sit amet. Nibh tortor id aliquet lectus proin nibh. </p>
          </div>
        </div>
     
</div>
      

  )
}

export default LeftBar
// {/* <div className="absolute top-0 right-0 h-12 w-18 p-4">
//         <button className="js-change-theme focus:outline-none"/>🌙
//       </div> */}
