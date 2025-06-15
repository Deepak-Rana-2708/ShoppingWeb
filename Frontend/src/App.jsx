import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from './Components/Header'
import Footer from './Components/Footer'
function App() {

  return (
    <>
      <Headers />
      <main className="flex flex-col min-h-screen">
        <Outlet />
     </main>
      <Footer />
    </>
  )
}

export default App
