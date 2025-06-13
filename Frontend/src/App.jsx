import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from './Components/Header'
import Footer from './Components/Footer'
function App() {

  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
