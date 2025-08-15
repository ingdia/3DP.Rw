// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <-- IMPORT THE IMAGE COMPONENT
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/data", label: "Data" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact" },
  { href: "/data-maturity-assessment", label: "Assessment" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* === LOGO SECTION (CHANGED) === */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/3dp.jpg" // The path to your logo in the `public` folder
                alt="Your Company Logo"
                width={110} // Set your desired width
                height={25} // Set your desired height
                priority // Add priority to load the logo quickly
                className="h-12 w-auto"
              />
            </Link>
          </div>
          {/* === END OF LOGO SECTION === */}

          {/* Desktop Navigation Links (Unchanged) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-white font-medium hover:text-yellow-600 transition-colors
                  ${
                    pathname === link.href
                      ? "text-white border-b-2 border-yellow-400"
                      : ""
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons (Unchanged) */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/login"
              className="px-4 py-2 w-30 text-center rounded-full hover:bg-yellow-500 hover:text-white text-white font-medium transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-yellow-700 text-white hover:bg-yellow-500 font-bold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button (Unchanged) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Unchanged) */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-3 py-2 text-white font-medium hover:bg-yellow-700 rounded-full text-center w-30
                  ${
                    pathname === link.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-50 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 pb-3">
              <div className="flex flex-col space-y-2 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-white font-medium hover:bg-yellow-700 rounded-full text-center w-30"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 bg-yellow-700 text-white rounded-full w-30 hover:bg-yellow-500 transition-colors text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
