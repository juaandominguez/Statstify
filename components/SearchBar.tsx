"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { z } from "zod";
import { toast, Toaster } from "react-hot-toast";

const mySchema = z.string().min(1).max(50);

interface Props {
  isExpanded?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsExpanded?: (value: boolean) => void;
}

const SearchBar: React.FC<Props> = ({
  isExpanded = false,
  setIsExpanded = () => {},
}) => {
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

  const handleGoBack = () => {
    setIsExpanded(false);
  };
  return (
    <>
      <Toaster position="top-right" />
      <div
        className={`input-bordered input-primary join m-auto  ${
          isExpanded ? "flex" : "hidden sm:flex"
        }`}
      >
        {isExpanded && (
          <button
            className="join-item btn text-gray-400"
            onClick={() => {
              handleGoBack();
            }}
          >
            <ArrowBackIcon />
          </button>
        )}
        <input
          type="text"
          placeholder="Search"
          className={`input join-item w-full max-w-xs`}
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
