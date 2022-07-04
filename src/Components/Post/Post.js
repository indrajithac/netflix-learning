import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../../axios'
import YouTube from 'react-youtube';
import { API_KEY, imageUrl } from '../../constants/constants';
import { firestore } from '../../firebase/config';
import { AuthContext } from '../../store/Context';
import './Post.css'

function Post(props) {
  const { user, setUser } = useContext(AuthContext);
  const [urlId, setUrlId] = useState('')

  const location = useLocation();
  const { movie } = location.state;
  console.log(movie);

  const addToMyList = async (movieToList) => {
    if (user) {
      console.log(movieToList);
      const docRef = await addDoc(collection(firestore, 'users', props.currentUser[0].id, 'myList'), {
        movieId: movieToList.id,
        ...movieToList
      })
      console.log("Document written with ID: ", docRef.id);
    }
    else {
      alert("Login to add My list")
    }
  }
  
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
      rel: 0


    }
  }
  useEffect(() => {
    const fetchData = async () => {
      if (movie.media_type === "tv") {
        await axios.get(`tv/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
          if (response.data.results.length !== 0) {
            console.log(response.data.results);
            setUrlId(response.data.results[0])
          } else {
            console.log('empty trailer');
          }
        })
      } else {
        await axios.get(`movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
          if (response.data.results.length !== 0) {
            console.log(response.data.results);
            setUrlId(response.data.results[0])
          } else {
            console.log('empty trailer');
          }
        })
      }
    }
    console.log(urlId);
    fetchData()
  }, [])

  return (
    <div className='post'>
      <div className="video" style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}>
        {urlId && <YouTube videoId={urlId.key} opts={opts} className="iframe" />}
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
            <h1 className='post-description' >{movie ? movie.overview : ""}</h1>
            <div className='post-description'>
              {movie.media_type === "movie" && <h4>Type: Movie</h4>}
              {movie.media_type === "tv" && <h4>Type: TV Show</h4>}
              {movie.first_air_date && <h4>First episode on: {movie.first_air_date}</h4>}
              {movie.release_date && <h4>Release Date: {movie.release_date}</h4>}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Post