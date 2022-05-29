import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { useRoutes } from './routes/route'

function App() {
  const routes = useRoutes()

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        {routes}
      </div>
    </div>
  )
}

export default App
