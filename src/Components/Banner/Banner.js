import React, { useEffect, useState } from 'react'

import { API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'
import './Banner.css';
import { Link } from 'react-router-dom';


function Banner(props) {
    const [movie, setMovie] = useState()

    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}`).then((response) => {
            console.log(response.data.results);
            setMovie(response.data.results.sort(function (a, b) { return 0.5 - Math.random() })[0])

        })
    }, [])



    return (

        <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }} className='banner'>
            <div className="overlay">
                <div className='content'>
                    <h1 className="title">{movie ? movie.title ? movie.title : movie.name : ''}</h1>
                    <div className='banner_buttons'>
                        <Link to={"/netflix-learning/movie"} state={{ movie:movie }}>
                            <button className='button'>Play</button>
                        </Link>
                        <button className='button' onClick={() => props.addToMyList(movie)}>My List +</button>
                    </div>
                    <h1 className='description'>{movie ? movie.overview : ""}</h1>

                </div>
            </div>
        </div>
    )
}

export default Banner
