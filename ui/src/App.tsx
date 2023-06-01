import React from 'react'
import Axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/app.scss'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing axios={axios} />} />
        <Route path="/login" element={<Login axios={axios} />} />
        <Route path="/signup" element={<Signup axios={axios} />} />
        <Route path="/home" element={<Home axios={axios} />} />
      </Routes>
    </Router>
  )
}

export default App
