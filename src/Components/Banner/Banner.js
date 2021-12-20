import React, { useEffect, useState } from 'react'

import {API_KEY} from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'


function Banner() {
    const [state, setstate] = useState(initialState)
    useEffect(()=>{
        axios.get(`trending/all/week?api_key=${API_KEY}`).then((response)=>{
            console.log(response.data.results[0]);
        })
    },[])
    
    return (
        <div className='banner'>
            <div className='content'>
                <h1 className='title'>MOVIE NAME</h1>
                <div className='banner_buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'>Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</h1>

            </div>
            <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner
