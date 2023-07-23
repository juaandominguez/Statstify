"use client"
import { useEffect } from 'react';
import { redirect} from 'next/navigation'
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import HomePage from '@/components/HomePage';

export default function Home() {

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
      <Navbar session={session}/>
      <HomePage session={session}/>
    </>
  )
}
