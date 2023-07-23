"use client";
import React from 'react'
interface HomePageProps {
    session: any
}



const HomePage: React.FC<HomePageProps> = ({session}) => {
  const token = session.accessToken;
  async function fetchWebApi(endpoint: string, method: string, body?: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
  }

async function getTopTracks(){
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}



    async function handleCLick(){
        const topTracks = await getTopTracks();
          topTracks?.map((track: any, index: number) => (
            console.log(`${index + 1}- ${track.name} Made by: `,
            track.artists.map((artist: any) => (`${artist.name} `)).join(''))
          )
        )
      }
    return (
    <>
        <div className='flex h-[80vh] w-screen items-center justify-center'>
          <div className='btn btn-primary' onClick={handleCLick}>FETCH DATA</div>
        </div>
    </>
  )
}

export default HomePage