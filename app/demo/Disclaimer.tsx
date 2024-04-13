import React from "react";

const Disclaimer = () => {
  return (
    <h1 className="mx-[5vw] mt-10 h-[50px] w-[90vw] text-center text-3xl">
      This is a demo page with very reduced features. Please{" "}
      <a
        href={`${process.env.NEXT_PUBLIC_URL}/sign-in`}
        className="text-green-400 underline"
      >
        log in
      </a>{" "}
      for the full experience.
    </h1>
  );
};

export default Disclaimer;
