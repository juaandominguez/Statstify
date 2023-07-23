"use client"
import { useSession } from "next-auth/react";
import MainScreen from "./components/MainScreen";
import { redirect } from "next/navigation";


const Page = () => {
  const { data: session, status } = useSession();
  if(status === 'authenticated') redirect('/')
  if(status === 'loading'){
    return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>)
  }
  return (
    <>
    <MainScreen />
    </>
  );
};

export default Page;