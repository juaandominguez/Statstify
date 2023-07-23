"use client";
import React, { useEffect } from 'react'
import TopTracks from './TopTracks';
import Heading from './Heading';
interface HomePageProps {
    session: any
    timeRange: 'short_term' | 'medium_term' | 'long_term'
}



const HomePage: React.FC<HomePageProps> = ({session, timeRange}) => {
  
  useEffect(() => {
    if(session){
      console.log(session)
    }
    console.log(timeRange)
  },[])
    return (
    <div className='mt-10'>
    <Heading title='Top Tracks' description='Your top tracks'/>
    <TopTracks session={session} timeRange={timeRange}/>
    </div>
  )
}

export default HomePage