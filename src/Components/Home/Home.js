import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../firebase/config'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { AuthContext } from '../../store/Context'
import Banner from '../Banner/Banner'
import RowPost from '../RowPost/RowPost'
import { action, comedy, horror, originals, romance, trending } from '../../urls'

function Home(props) {
  const { user } = useContext(AuthContext);
  const [myList, setMyList] = useState([]);



  const addToMyList = async (movie) => {
    if (user) {
      console.log(movie);
      const docRef = await addDoc(collection(firestore, 'users', props.currentUser[0].id, 'myList'), { 
        movieId:movie.id,
        ...movie 
      })
      console.log("Document written with ID: ", docRef.id);
    }
    else {
      alert("Login to add My list")
    }
  }

  useEffect(() => {
    const getMyList = async () => {
      const q = query(collection(firestore, "users", user && props.currentUser[0].id, 'myList'));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((details) => ({
        ...details.data(),
        id: details.id

      }));
      //console.log(queryData)
      setMyList(queryData)
    }
    getMyList()

  })


  return (
    <div>
      <Banner addToMyList={addToMyList} />
      <RowPost url={trending} addToMyList={addToMyList} title='Trending' />
      <RowPost myList={myList} addToMyList={addToMyList} title='My List' />
      <RowPost url={originals} addToMyList={addToMyList} title='Netflix Orginals' />
      <RowPost url={action} addToMyList={addToMyList} title='Action' small />
      <RowPost url={comedy} addToMyList={addToMyList} title='Comedy' small />
      <RowPost url={horror} addToMyList={addToMyList} title='Horror' small />
      <RowPost url={romance} addToMyList={addToMyList} title='Romance' small />
    </div>
  )
}

export default Home;