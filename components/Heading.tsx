"use client";
import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <article className="mx-[10vw] mt-10">
      <h2 className="mb-1 text-3xl font-bold text-white">{title}</h2>
      <h4 className="font-semibold">{description}</h4>
    </article>
  );
};

export default Heading;
