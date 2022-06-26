import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
import { AuthContext } from './store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './firebase/config';
import Post from './Components/Post/Post';

function App() {
  const { user, setUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([])

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

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(firestore, "users"), where("id", "==", user && user.uid));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((details) => ({
        ...details.data(),
        id: details.id

      }));
      console.log(queryData)
      setCurrentUser(queryData)
    }
    getUserData()
  }, [user])


  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/netflix-learning' element={<Home currentUser={currentUser}/>} />
          <Route path='/netflix-learning/login' element={<Login />} />
          <Route path='/netflix-learning/signup' element={<Signup />} />
          <Route path='/netflix-learning/movie' element={<Post currentUser={currentUser}/>}/>

        </Routes>
      </Router>


    </div>
  )
}

export default App
