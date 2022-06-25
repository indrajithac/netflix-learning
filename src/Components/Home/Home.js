import React from 'react'
import Banner from '../Banner/Banner'
import RowPost from '../RowPost/RowPost'
import { action, comedy, horror, originals, romance, trending } from '../../urls'

function Home() {
  return (
    <div>
        <Banner />
        <RowPost url={trending} title='Trending' />
        <RowPost url={originals} title='Netflix Orginals' />
        <RowPost url={action} title='Action' small />
        <RowPost url={comedy} title='Comedy' small />
        <RowPost url={horror} title='Horror' small />
        <RowPost url={romance} title='Romance' small />
    </div>
  )
}

export default Home;