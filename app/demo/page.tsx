import React from "react";
import { TimeRange } from "@/types/types";
import HomePage from "./HomePage";
import Disclaimer from "./Disclaimer";
const Page = () => {
  const timeRange: TimeRange = "short_term";
  return (
    <>
      <Disclaimer />
      <HomePage timeRange={timeRange} />
    </>
  );
};

export default Page;
