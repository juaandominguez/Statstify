import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Statstify",
  description: "Check your spotify stats with Statstify",
  ogType: "website",
  ogTitle: "Statstify",
  ogDescription: "Check your spotify stats with Statstify",
  ogUrl: "https://statstify.vercel.app/",
  ogImage: "https://statstify.vercel.app/og.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="forest">
      <body className={inter.className}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
