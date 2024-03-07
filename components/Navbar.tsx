"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import icon from "../public/assets/icon.webp";
import { TimeRange } from "@/types/types";
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";

interface NavbarProps {
  session: any;
  timeRange: TimeRange;
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: TimeRange) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  session,
  timeRange,
  handleChange,
}) => {
  const [checked, setChecked] = useState<TimeRange>(timeRange);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  const changeCheck = (value: TimeRange) => {
    setChecked(value);
  };
  const handleClick = (value: TimeRange) => {
    changeCheck(value);
    handleChange(value);
  };
  const iterateTimeRange = (value: TimeRange) => {
    if (value === "short_term") handleClick("medium_term");
    else if (value === "medium_term") handleClick("long_term");
    else handleClick("short_term");
  };

  const onButtonClick = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsExpanded(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="navbar justify-between bg-base-100">
        {isExpanded ? (
          <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        ) : (
          <>
            <div className="ml-4" onClick={() => (window.location.href = "/")}>
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
            <SearchBar />
            <div>
              <div className="join mr-6 hidden lg:block">
                <input
                  className="btn mx-2"
                  type="radio"
                  name="options"
                  aria-label="4 Weeks"
                  checked={checked === "short_term"}
                  onChange={() => handleClick("short_term")}
                />
                <input
                  className="btn mx-2"
                  type="radio"
                  name="options"
                  aria-label="6 Months"
                  checked={checked === "medium_term"}
                  onChange={() => handleClick("medium_term")}
                />
                <input
                  className="btn mx-2"
                  type="radio"
                  name="options"
                  aria-label="Lifetime"
                  checked={checked === "long_term"}
                  onChange={() => handleClick("long_term")}
                />
              </div>
              <div className="flex flex-row">
                <button
                  className="mr-[6vw] flex cursor-pointer items-center justify-center sm:hidden"
                  onClick={onButtonClick}
                >
                  <SearchIcon />
                </button>
                <div className="dropdown-end dropdown mr-10">
                  <label
                    tabIndex={0}
                    className="btn-ghost btn-circle avatar btn"
                  >
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
                      <a onClick={() => iterateTimeRange(timeRange)}>
                        Iterate Time interval
                      </a>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
