"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import HomePage from "@/components/HomePage";
import { TimeRange } from "@/utils/types";

export default function Home() {
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/sign-in");
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  return (
    <>
      <Navbar
        session={session}
        timeRange={timeRange}
        handleChange={setTimeRange}
      />
      <HomePage session={session} timeRange={timeRange} />
    </>
  );
}
