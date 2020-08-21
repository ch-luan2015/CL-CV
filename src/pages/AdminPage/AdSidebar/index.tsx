import React, { Children } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import CreatePost from '../../../components/CreatePost'


function AdSidebar() {
  return (
    <>
      <aside id="sidebar" className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">
        <ul className="list-reset flex flex-col">
          <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
            <Link to="/admin/post" className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
              <i className="fas fa-tachometer-alt float-left mx-2" />
              Create Post
              <span>
                <i className="fas fa-angle-right float-right" />
              </span>
            </Link>
          </li>
          <li className=" w-full h-full py-3 px-2 border-b border-light-border bg-white">
            <Link to="/admin/list" className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
              <i className="fas fa-tachometer-alt float-left mx-2" />
              Post List
              <span>
                <i className="fas fa-angle-right float-right" />
              </span>
            </Link>
          </li>
          <li className="w-full h-full py-3 px-2 border-b border-light-border">
            <a href="forms.html" className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
              <i className="fab fa-wpforms float-left mx-2" />
              Post Settings
              <span>
                <i className="fa fa-angle-right float-right" />
              </span>
            </a>
          </li>
          <li className="w-full h-full py-3 px-2 border-b border-light-border">
            <a href="buttons.html" className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
              <i className="fas fa-grip-horizontal float-left mx-2" />
              Category
              <span>
                <i className="fa fa-angle-right float-right" />
              </span>
            </a>
          </li>
          <li className="w-full h-full py-3 px-2 border-b border-light-border">
            <a href="tables.html" className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
              <i className="fas fa-table float-left mx-2" />
              Tables
              <span>
                <i className="fa fa-angle-right float-right" />
              </span>
            </a>
          </li>
        </ul>
      </aside>

    </>
  )
}

export default AdSidebar
