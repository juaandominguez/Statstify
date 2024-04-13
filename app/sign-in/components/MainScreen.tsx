"use client";
import React, { useState } from "react";
import spotify from "@/public/assets/spotify.svg";
import spotifyhover from "@/public/assets/spotifyhover.svg";
import divbg from "@/public/assets/divbg.webp";
import { signIn } from "next-auth/react";
import Image from "next/image";

const h1Style =
  "text-7xl md:text-8xl font-bold md:text-left text-center text-white antialiased tracking-tighter text-balance";
const MainScreen = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCLick = () => {
    signIn("spotify", { callbackUrl: "/" });
  };
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-around bg-cover bg-no-repeat py-20 md:items-start md:px-20"
      style={{ backgroundImage: `url(${divbg.src})` }}
    >
      <div>
        <h1 className={h1Style}>
          Your{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Music
          </span>
        </h1>
        <h1 className={h1Style}>
          Your{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Stats
          </span>
        </h1>
      </div>
      {/* <h4 className={subtitleStyle}>See your Spotify stats here!</h4> */}
      <div className="space-y-3">
        <button
          className="hover:bg btn-outline flex items-center justify-center space-x-6 rounded-full  border-2 px-10 py-2 text-2xl font-semibold transition duration-300 ease-in-out hover:text-black"
          onMouseOver={() => setIsHovered(true)}
          onFocus={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onClick={handleCLick}
        >
          <h2>Sign in using Spotify</h2>
          <div className="inline">
            {isHovered ? (
              <Image
                src={spotifyhover.src}
                alt="Spotify logo"
                className="h-6 w-6 transition duration-1000"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src={spotify.src}
                alt="Spotify logo"
                className="h-6 w-6 transition duration-1000"
                width={24}
                height={24}
              />
            )}
          </div>
        </button>
        <a
          className="hover:bg btn-outline flex w-[120px] cursor-pointer items-center justify-center space-x-6  rounded-full border-2 px-10 py-2 text-lg font-semibold transition duration-300 ease-in-out hover:text-black"
          href="/demo"
        >
          Demo
        </a>
      </div>
      {/* {import gif} */}
    </div>
  );
};

export default MainScreen;
