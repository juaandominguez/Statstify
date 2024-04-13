import React from "react";

const Disclaimer = () => {
  return (
    <h1 className="mt-10 h-[50px] w-[95vw] text-center text-3xl">
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
