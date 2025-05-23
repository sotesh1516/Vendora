import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
      <SignUp/>
    </>
  )
}

export default App
