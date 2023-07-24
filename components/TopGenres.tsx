import React from 'react'

interface TopGenreProps {
    session: any
    timeRange: 'short_term' | 'medium_term' | 'long_term'
}
const TopGenres: React.FC<TopGenreProps> = ({session, timeRange}) => {
    
  return (
    <div className='flex flex-row flex-grow overflow-x-scroll w-full'>
        <div className='flex-shrink-0'>1</div>
        <div className='flex-shrink-0'>2</div>
        <div className='flex-shrink-0'>3</div>
        <div className='flex-shrink-0'>4</div>
        <div className='flex-shrink-0'>5</div>
        <div className='flex-shrink-0'>6</div>
        <div className='flex-shrink-0'>7</div>
        <div className='flex-shrink-0'>8</div>
    </div>
  )
}

export default TopGenres