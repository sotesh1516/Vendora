import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard'
import Profile from './components/Profile';



function App() {

  return (
    <>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App
