import React, { useEffect } from 'react'
import { useScript } from '../CustomHook/useScript'

interface Props {}

function Header(props: Props) {
  const [loaded, error] = useScript('/scriptHeader.js')

  useEffect(() => {
    if (!loaded) return
  })

  return (
    <div id="header" className="fixed w-full h-18 z-10 top-0 bg-white shadow">
      <div id="progress" className="h-1 z-20 top-0" style={{ background: 'linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0)' }} />
      <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
        <div className="pl-4">
          <a className="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl" href="#">
            500.dev
          </a>
        </div>
      
        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white md:bg-transparent z-20" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-gray-900 font-bold no-underline" href="#">
                Project
              </a>
            </li>
            <li className="mr-3">
              <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">
                DashBoard
              </a>
            </li>
            <li className="mr-3">
              <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">
                GameWord
              </a>
            </li>
            <li className="mr-3">
              <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">
                About We
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
