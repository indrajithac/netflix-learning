import axios from '../../axios'
import { API_KEY, imageUrl } from '../../constants/constants'
import React, { useEffect, useState } from 'react'
import './RowPost.css'
import YouTube from 'react-youtube'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')

    useEffect(() => {
        axios.get(props.url).then((response) => {
            //console.log(response.data.results[0]);
            setMovies(response.data.results)
        }).catch(err => {
            //alert('error')
        })
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    const handleMovie = (id) => {
        console.log(id);
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results.sort(function (a, b) { return 0.5 - Math.random() })[0])
            } else {
                console.log('empty trailer');
            }
        })

    }

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj, index) =>

                    <img onClick={() => handleMovie(obj.id)} key={index} className={props.small ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.poster_path}`} alt="poster" />
                )}

            </div>
            {urlId && <YouTube videoId={urlId.key} opts={opts} />}

        </div>
    )
}

export default RowPost