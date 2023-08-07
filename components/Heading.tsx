"use client";
import React from "react";

interface HeadingProps {
  title: string;
  description: string;
  margin?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  margin = true,
}) => {
  return (
    <article className={`mt-10 ${margin && "mx-[10vw]"}`}>
      <h2 className="mb-1 text-3xl font-bold text-white">{title}</h2>
      <h4 className="font-semibold">{description}</h4>
    </article>
  );
};

export default Heading;
