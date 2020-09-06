import React, { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Props {
  preview?: boolean
  children: React.ReactNode
}


function Layout({ preview, children }: Props) {
  return (
    <div className="bg-gray-100 font-sans">
        <Header />
        <div className="min-h-screen mt-16 pt-4">
          <main>{children}</main>
        </div>
    </div>
  )
}

export default Layout


