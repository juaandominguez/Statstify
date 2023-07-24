"use client";
import React, { useEffect } from 'react'
import TopTracks from './TopTracks';
import Heading from './Heading';
import TopGenres from './TopGenres';
interface HomePageProps {
    session: any
    timeRange: 'short_term' | 'medium_term' | 'long_term'
}



const HomePage: React.FC<HomePageProps> = ({session, timeRange}) => {
    return (
    <div className='mt-10'>
      <Heading title='Top Tracks' description={`Your top tracks ${timeRange === 'short_term'? 'of the last month' : timeRange === 'medium_term' ? 'of the last 6 months': ''}`}/>
      <TopTracks session={session} timeRange={timeRange}/>
      <Heading title='Top Genres' description={`Your top genres ${timeRange === 'short_term'? 'of the last month' : timeRange === 'medium_term' ? 'of the last 6 months': ''}`}/>
      <TopGenres session={session} timeRange={timeRange}/>
    </div>
  )
}

export default HomePage