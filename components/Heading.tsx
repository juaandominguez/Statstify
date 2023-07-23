import React from 'react'

interface HeadingProps {
    title: string
    description: string
}

const Heading: React.FC<HeadingProps> = ({title, description}) => {
  return (
    <article className='mx-[10vw]'>
        <h2 className='font-bold text-3xl text-white mb-1'>{title}</h2>
        <h4 className='font-semibold'>{description}</h4>
    </article>
  )
}

export default Heading