import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import City from './pages/City'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Signin from './pages/Signin'
import Login from './pages/Login'
import Flight from './pages/Flight'
import Payment from './pages/Payment'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/city" element={<City />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
