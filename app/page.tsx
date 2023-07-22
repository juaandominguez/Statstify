"use client"
import { useEffect } from 'react';
import { redirect} from 'next/navigation'
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import HomePage from '@/components/HomePage';

export default function Home() {

  const { data: session, status } = useSession()
  if(status === 'unauthenticated') redirect('/signin')
  if(status === 'loading') return <></>
  return (
    <>
      <Navbar session={session}/>
      <HomePage session={session}/>
    </>
  )
}
