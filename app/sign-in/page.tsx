"use client"
import React, {useState} from 'react'
import spotify from '@/public/assets/spotify.svg'
import spotifyhover from '@/public/assets/spotifyhover.svg'
import divbg from '@/public/assets/divbg.png'
const h1Style = 'text-6xl font-bold text-center absolute top-0 text-white'
const page = () => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <>
    <div className='w-screen h-[80vh] flex items-end justify-start bg-cover bg-no-repeat bg-right' style={{backgroundImage: `url(${divbg.src})`}}>
      <button className="btn btn-outline ml-20 mb-20" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>Sign in using spotify
        <div className='inline'>
          {isHovered ? (
            <img src={spotifyhover.src} alt="spotify logo" className='w-6 h-6 transition duration-1000'/>
          ) : (
            <img src={spotify.src} alt="spotify logo" className='w-6 h-6 transition duration-1000'/>
          )}
        </div>
      </button>
    </div>
    <h1 className={`${h1Style} mt-20 ml-20`}>Your Music</h1>
    <h1 className={`${h1Style} mt-40 ml-20`}>Your Wrapped</h1>
    </>
  )
}

export default page