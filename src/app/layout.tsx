import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import { NavBar } from "@/components/navBar";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "tournament.sh",
  description: "The ultimate osu! tournament platform",
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
        <div className="mb-8"> {/* load bearing div */}
          <NavBar />

        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
