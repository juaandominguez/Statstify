"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { z } from "zod";
import { toast, Toaster } from "react-hot-toast";

const mySchema = z.string().min(1).max(50);
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (mySchema.safeParse(search).success === true) {
      router.push(`/search/${search}`);
    } else {
      toast.error("Please enter a valid search value", {
        style: {
          borderRadius: "10px",
          background: "#171212",
          color: "#fff",
        },
      });
    }
  };
  return (
    <>
      <Toaster position="top-right" />
      <div className="input-bordered input-primary join m-auto hidden sm:flex">
        <input
          type="text"
          placeholder="Search"
          className="input join-item w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="join-item btn text-gray-400"
          onClick={() => {
            handleSearch();
          }}
        >
          <SearchIcon />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
