import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/netflix-learning' element={<Home />} />
          <Route path='/netflix-learning/login' element={<Login />} />
          <Route path='/netflix-learning/signup' element={<Signup />} />

        </Routes>
      </Router>


    </div>
  )
}

export default App
