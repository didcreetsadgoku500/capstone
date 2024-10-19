import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { NavBar } from "@/components/navBar";
import { Separator } from "@/components/ui/separator";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased mx-auto px-4 py-2 flex flex-col`}
      >
        <div>
        <NavBar />
        <Separator />

        </div>
        {children}
      </body>
    </html>
  );
}
