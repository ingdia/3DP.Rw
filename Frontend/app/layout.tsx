"use client"; // 👈 add this at the very top, since we'll use hooks

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { usePathname } from "next/navigation"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/Admin"); // 
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Toaster position="top-center" reverseOrder={false} />

       
        {!isAdmin && <Navbar />}
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
