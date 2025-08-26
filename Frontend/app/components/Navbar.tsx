// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <-- IMPORT THE IMAGE COMPONENT
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
   { href: "/trainings", label: "Trainings" },
  { href: "/service", label: " Our Services" },
  { href: "/data-maturity-assessment", label: "Assessment" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* === LOGO SECTION (CHANGED) === */}
         <div className="flex-shrink-0 bg-gray-100">
  <Link href="/" className="flex items-center">
    <Image
      src="/3DP.jpg"
      alt="Your Company Logo"
      width={210} // max width for large screens
      height={80} // original height for large screens
      priority
      className="h-12 sm:h-16 md:h-20 w-auto" // responsive heights
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

{/* Mobile Menu Dropdown */}
{isOpen && (
  <div className="md:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col items-center">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={`
            block px-3 py-2 text-white font-medium hover:bg-yellow-700 rounded-full text-center w-30
            ${
              pathname === link.href
                ? "bg-gray-500 text-blue-700"
                : "text-gray-50 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
        >
          {link.label}
        </Link>
      ))}

     <div className="border-t border-gray-100 pt-4 pb-3 w-full flex justify-between px-6">
  <Link
    href="/login"
    onClick={() => setIsOpen(false)}
    className="px-3 py-2 text-white font-medium hover:bg-yellow-700 rounded-full text-center w-1/2 mr-2"
  >
    Log In
  </Link>
  <Link
    href="/signup"
    onClick={() => setIsOpen(false)}
    className="px-3 py-2 bg-yellow-700 text-white rounded-full w-1/2 ml-2 hover:bg-yellow-500 transition-colors text-center"
  >
    Sign Up
  </Link>
</div>

    </div>
  </div>
)}

    </nav>
  );
};
