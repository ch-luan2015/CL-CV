import React, { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Props {
  children: ReactNode
}

function Layout(props: Props) {
  return (
    <div className="bg-gray-100 font-sans flex flex-col items-center justify-center">
        <Header />
        <div className="mt-18 pt-16">
            {props.children}
        </div>
            
        <Footer />
    </div>
  )
}

export default Layout
