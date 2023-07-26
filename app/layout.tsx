import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Statify",
  description: "Check your spotify stats with Statify",
  ogType: "website",
  ogTitle: "Statify",
  ogDescription: "Check your spotify stats with Statify",
  ogUrl: "https://statify.vercel.app",
  image: "https://statify.vercel.app/og.png",
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
