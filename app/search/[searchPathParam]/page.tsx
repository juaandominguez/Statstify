"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SearchPage from "./components/SearchPage";
import Navbar from "@/components/NavbarSimplified";

const Page = ({ params }: { params: { searchPathParam: string } }) => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/sign-in");
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  const decodedPageParam = decodeURIComponent(params.searchPathParam);
  return (
    <main className="flex flex-col items-center justify-center">
      <Navbar session={session} />
      <SearchPage searchPathParam={decodedPageParam} session={session} />
    </main>
  );
};

export default Page;
