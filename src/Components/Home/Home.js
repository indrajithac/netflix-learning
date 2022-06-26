import React, { useContext } from 'react'
import { firestore } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'
import { AuthContext } from '../../store/Context'
import Banner from '../Banner/Banner'
import RowPost from '../RowPost/RowPost'
import { action, comedy, horror, originals, romance, trending } from '../../urls'

function Home(props) {
  const { user } = useContext(AuthContext)

  const addToMyList = async (movie) => {
    if (user) {
      console.log(movie);
      const docRef = await addDoc(collection(firestore, 'users', props.currentUser[0].id, 'myList'), { movie })
      console.log("Document written with ID: ", docRef.id);
    }
    else{
      alert("Login to add My list")
    }
  }

  return (
    <div>
      <Banner addToMyList={addToMyList} />
      <RowPost url={trending} title='Trending' />
      <RowPost />
      <RowPost url={originals} title='Netflix Orginals' />
      <RowPost url={action} title='Action' small />
      <RowPost url={comedy} title='Comedy' small />
      <RowPost url={horror} title='Horror' small />
      <RowPost url={romance} title='Romance' small />
    </div>
  )
}

export default Home;