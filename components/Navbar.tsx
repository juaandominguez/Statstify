import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

interface NavbarProps {
    session: any
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }
  return (
    <>
    <div className="navbar bg-base-100">
        <div className="flex-1 ml-10">
            <a className="btn btn-ghost normal-case text-xl text-secondary">SpotiWrapped</a>
        </div>
        <div className="dropdown dropdown-end mr-10">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image 
          src={session.user.image}
          alt="Picture of the author"
          width={40}
          height={40}
          />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    </div>
    </>
  )
}

export default Navbar