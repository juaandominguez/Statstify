"use client";
import React from 'react'
import TopTracks from './TopTracks';
interface HomePageProps {
    session: any
}



const HomePage: React.FC<HomePageProps> = ({session}) => {
  const token = session.accessToken;
  
    return (
    <>
    <TopTracks session={session}/>
        {/* <div className='flex h-[80vh] w-screen items-center justify-center'>
          <div className='btn btn-primary' onClick={handleCLick}>FETCH DATA</div>
          <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div> */}
    </>
  )
}

export default HomePage