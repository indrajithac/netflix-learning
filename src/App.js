import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
import { AuthContext } from './store/Context';

function App() {
  const { user,setUser } = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)

      } else {

      }
    });
  })
console.log(user);


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
