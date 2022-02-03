// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import User from '../pages/User'
import Dashboard from '../pages/Dashboard'
import Album from '../pages/Album'

export default function Router() {
  return (
    // <Teste />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/user" exact element={<User />} />
          <Route path="/user/:uuid" element={<User />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/album" exact element={<Album />} />
          <Route path="/album/:id" element={<Album />} />
        </Routes>
      </BrowserRouter>
  )
}
