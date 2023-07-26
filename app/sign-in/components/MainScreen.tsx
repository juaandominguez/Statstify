"use client";
import React, { useState } from "react";
import spotify from "@/public/assets/spotify.svg";
import spotifyhover from "@/public/assets/spotifyhover.svg";
import divbg from "@/public/assets/divbg.png";
import { signIn } from "next-auth/react";
import gif from "@/public/assets/scrollDown.gif";

const h1Style =
  "text-7xl xl:text-8xl font-bold md:text-left text-center text-white";
const subtitleStyle = "text-xl text-center text-white";
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
            Wrapped
          </span>
        </h1>
      </div>
      {/* <h4 className={subtitleStyle}>See your Spotify stats here!</h4> */}
      <button
        className="btn-outline btn text-xl"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={handleCLick}
      >
        Sign in using Spotify
        <div className="inline">
          {isHovered ? (
            <img
              src={spotifyhover.src}
              alt="Spotify logo"
              className="h-6 w-6 transition duration-1000"
            />
          ) : (
            <img
              src={spotify.src}
              alt="Spotify logo"
              className="h-6 w-6 transition duration-1000"
            />
          )}
        </div>
      </button>
      {/* {import gif} */}
    </div>
  );
};

export default MainScreen;
