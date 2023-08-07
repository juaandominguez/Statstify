"use client";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Statstify",
  description: "Check your spotify stats with Statstify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="forest">
      <head>
        <meta charSet="utf-8" />
        <title>Statstify</title>
        <meta
          name="description"
          content="Check your spotify stats with Statstify"
        />
        <meta property="og:url" content="https://statstify.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Statstify" />
        <meta
          property="og:description"
          content="Check your spotify stats with Statstify"
        />
        <meta
          property="og:image"
          content="https://statstify.vercel.app/og.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image"
          content="https://statstify.vercel.app/og_smaller.png"
        />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="statstify.vercel.app" />
        <meta property="twitter:url" content="https://statstify.vercel.app" />
        <meta name="twitter:title" content="Statstify" />
        <meta
          name="twitter:description"
          content="Check your spotify stats with Statstify"
        />
        <meta
          name="twitter:image"
          content="https://statstify.vercel.app/og.png"
        />
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
