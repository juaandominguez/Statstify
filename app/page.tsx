"use client"
import React, { createContext, useState } from 'react'
import { redirect} from 'next/navigation'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import HomePage from '@/components/HomePage';

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export default function Home() {
  const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
  const { data: session, status } = useSession()
  if(status === 'unauthenticated') redirect('/sign-in')
  if(status === 'loading'){
    return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>)
  }
  return (
      <>
        <Navbar session={session} timeRange={timeRange} handleChange={setTimeRange}/>
        <HomePage session={session} timeRange={timeRange}/>
      </>
  )
}
