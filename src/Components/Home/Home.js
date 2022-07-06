import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../firebase/config'
import { addDoc, collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { AuthContext } from '../../store/Context'
import Banner from '../Banner/Banner'
import RowPost from '../RowPost/RowPost'
import { action, comedy, horror, originals, romance, trending } from '../../urls'

function Home(props) {
  const { user } = useContext(AuthContext);
  const [myList, setMyList] = useState([]);
  const [refresh, setRefresh] = useState("")

  useEffect(() => {
    const getMyList = async () => {
      const q = query(collection(firestore, "users", user && props.currentUser[0].id, 'myList'));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((details) => ({
        ...details.data(),
        id: details.id

      }));
      console.log(queryData)
      setMyList(queryData)
    }
    getMyList()
  }, [props.currentUser, refresh])


  // const addToMyList = async (movie) => {
  //   if (user) {
  //     console.log(movie);
  //     const docRef = await addDoc(collection(firestore, 'users', props.currentUser[0].id, 'myList'), {
  //       movieId: movie.id,
  //       ...movie
  //     })
  //     console.log("Document written with ID: ", docRef.id);
  //     setMyList([...myList,movie])
  //   }
  //   else {
  //     alert("Login to add My list")
  //   }
  // }
  const addToMyList = async (movie) => {
    if (user) {
      console.log(movie);
      await setDoc(doc(firestore, 'users', props.currentUser[0].id, 'myList', `${movie.id}`), movie)
      //setMyList([...myList, movie])
      setRefresh(movie.id)
    }
    else {
      alert("Login to add My list")
    }
  }
  return (
    <div>
      <Banner addToMyList={addToMyList} />
      <RowPost url={trending} title='Trending' />
      <RowPost myList={myList} title='My List' />
      <RowPost url={originals} title='Netflix Orginals' />
      <RowPost url={action} title='Action' small />
      <RowPost url={comedy} title='Comedy' small />
      <RowPost url={horror} title='Horror' small />
      <RowPost url={romance} title='Romance' small />
    </div>
  )
}

export default Home;