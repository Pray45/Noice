import React from 'react'
import Nav from './components/Nav'
import Controller from './components/Controller'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <div className="relative z-10">
        <div className='flex'>
          <Nav />
          <Outlet />
        </div>
      </div>
      <div className="fixed bottom-0 z-30">
        <Controller />
      </div>
    </div>
  )
}

export default Layout