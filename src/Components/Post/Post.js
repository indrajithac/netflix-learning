import { addDoc, collection } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { imageUrl } from '../../constants/constants';
import { firestore } from '../../firebase/config';
import { AuthContext } from '../../store/Context';
import './Post.css'

function Post(props) {
  const { user, setUser } = useContext(AuthContext);

  const location = useLocation();
  const { movie } = location.state;
  //console.log(movie);

  const addToMyList = async (movieToList) => {
    if (user) {
      console.log(movieToList);
      const docRef = await addDoc(collection(firestore, 'users', props.currentUser[0].id, 'myList'), { 
        movieId:movieToList.id,
        ...movieToList 
      })
      console.log("Document written with ID: ", docRef.id);
    }
    else {
      alert("Login to add My list")
    }
  }

  return (
    <div className='post'>
      <div className="video">

      </div>
      <div className='post-content'>
        <div className='banner_buttons'>
          <button className='post-button'>Play</button>
          <button className='post-button' onClick={() => addToMyList(movie)}>My List +</button>
        </div>
        <div className='post-details'>
          <div className='post-poster'>
            <img src={`${imageUrl + movie.poster_path}`} alt="poster" />
          </div>
          <div>
            <h1 className="post-title">{movie ? movie.title ? movie.title : movie.name : ''}</h1>
            <h1 className='post-description'>{movie ? movie.overview : ""}</h1>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Post