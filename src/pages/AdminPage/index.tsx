import React from 'react'
import AdSidebar from './AdSidebar'
import AdMain from './AdMain'
import AdHeader from './AdHeader'
function AdminPage() {
  return (
    <div className="mx-auto bg-grey-darkest">
      <div className="min-h-screen flex flex-col">
        <AdHeader />
        <div className="flex flex-1">
          <AdSidebar />
          <AdMain />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
