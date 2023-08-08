"use client";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import icon from "../public/assets/icon.png";

interface NavbarProps {
  session: any;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div
          className="ml-4 flex-1"
          onClick={() => (window.location.href = "/")}
        >
          <a className="btn-ghost btn flex text-xl normal-case text-primary">
            Statstify{" "}
            <Image
              src={icon.src}
              alt="Spotify"
              height={30}
              width={30}
              className="ml-2"
            />
          </a>
        </div>
        <div className="dropdown-end dropdown mr-10">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <Image
                src={session.user.image}
                alt="Picture of the author"
                width={40}
                height={40}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a
                className="justify-between"
                href="https://www.spotify.com/es/account/overview/"
                target="_blank"
              >
                Profile
              </a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
