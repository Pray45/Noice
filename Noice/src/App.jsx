import React from 'react'
import './index.css'
import Nav from './components/Nav'
import Controller from './components/Controller'
import Home from './components/Home/Home.jsx'

function App() {
  return (
    <div>
      <div className="relative z-10">
        <div className='flex'>
          <Nav />
          <Home/>
        </div>
      </div>
      <div className="fixed bottom-0 z-30">
        <Controller />
      </div>
    </div>
  )
}
export default App