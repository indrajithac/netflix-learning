import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'
import { action, comedy, horror, originals, romance, trending } from './urls'
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={trending} title='Trending' /> 
      <RowPost url={originals} title='Netflix Orginals' /> 
      <RowPost url={action} title='Action' small/> 
      <RowPost url={comedy} title='Comedy' small/> 
      <RowPost url={horror} title='Horror' small/> 
      <RowPost url={romance} title='Romance' small/> 

    </div>
  )
}

export default App
