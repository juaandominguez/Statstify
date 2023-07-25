import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import spotify from "../public/assets/spotify.svg";

type TimeRange = "short_term" | "medium_term" | "long_term";

interface NavbarProps {
  session: any;
  timeRange: TimeRange;
  handleChange: (value: TimeRange) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  session,
  timeRange,
  handleChange,
}) => {
  const [checked, setChecked] = useState<TimeRange>(timeRange);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="ml-10 flex-1">
          <a className="btn btn-ghost flex text-xl normal-case text-primary">
            SpotiWrapped{" "}
            <img
              src={spotify.src}
              alt="Spotify"
              height={30}
              width={30}
              className="ml-2"
            />
          </a>
        </div>
        <div className="join mr-6 hidden md:block">
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
        <div className="dropdown dropdown-end mr-10">
          <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
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
            className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a
                className="justify-between"
                href="https://www.spotify.com/es/account/overview/"
              >
                Profile
              </a>
            </li>
            {/* <li><a>Settings</a></li> */}
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            <li>
              <a onClick={() => setIsModalOpen(true)}>Change Time interval</a>
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <dialog id="my_modal_2" className="modal absolute left-0 top-0">
          <form method="dialog" className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default Navbar;
