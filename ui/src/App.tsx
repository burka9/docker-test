import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/app.scss'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
