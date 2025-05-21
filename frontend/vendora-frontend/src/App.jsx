import React, { useState } from 'react'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUp/>
    </>
  )
}

export default App
