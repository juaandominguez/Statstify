import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-[100dvh] w-screen flex-col items-center justify-center text-white/90">
      <section className="flex flex-row items-center space-x-3">
        <h1 className="text-4xl">404 |</h1>
        <p className="text-xl">This page could not be found</p>
      </section>
      <a
        href="/"
        className="mt-12 rounded-lg bg-primary px-8 py-4 font-semibold transition duration-300 hover:bg-primary/80"
      >
        Home
      </a>
    </main>
  );
};

export default NotFound;
