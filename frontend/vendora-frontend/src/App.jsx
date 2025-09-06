import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard'
import Profile from './components/Profile';
import Listing from './components/DashboardSubComponents/Listing';
import { AuthProvider } from './components/contexts/AuthContext';
import Settings from './components/Settings';
import SearchResults from './components/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import ManageService from './components/ProfileSubComponents/MyListingSubComponents/ManageService';



function App() {

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/listing/:id' element={<Listing/>}/>
      <Route path='/results' element={<SearchResults/>}/>

      {/* protected routes */}
      <Route element={<ProtectedRoute />}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/manage/:id' element={<ManageService/>}/>
      </Route>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
