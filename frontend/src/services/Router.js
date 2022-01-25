// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import NewUser from '../pages/NewUser'
import Dashboard from '../pages/Dashboard'
import Album from '../pages/Album'

export default function Router() {
  return (
    // <Teste />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/album" element={<Album />} />
        </Routes>
      </BrowserRouter>
  )
}