import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import { Inter } from "next/font/google";

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
        <meta name="og:title" content="Statstify" />
        <meta
          name="og:description"
          content="Check your spotify stats with Statstify"
        />
        <meta name="og:url" content="https://statstify.vercel.app/" />
        <meta name="og:image" content="https://statstify.vercel.app/og.png" />
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
