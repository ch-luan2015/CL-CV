import React, { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Props {
  children: ReactNode
}

function Layout(props: Props) {
  return (
    <div className="bg-gray-100 font-sans flex flex-wrap flex-col">
        <Header />
        <div className="w-full mt-2">
            {props.children}
        </div>
            
        <Footer />
    </div>
  )
}

export default Layout
