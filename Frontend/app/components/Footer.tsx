// src/components/Footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/data", label: "Data Insights" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Brand */}
          <div className="md:col-span-1">
            {/* <Link href="/" className="inline-block mb-4">
              <Image
                src="/3dp.jpg"
                alt="Your Company Logo"
                width={110}
                height={25}
              />
            </Link> */}
            <p className="text-white text-sm">
              Transforming complex data into beautiful and intuitive
              visualizations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-yellow-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-yellow-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <p className="text-white text-sm mb-4">
              Stay up to date with our latest insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-yellow-600 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-600 transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-600 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-yellow-600 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* === BOTTOM BAR (FIXED) === */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex justify-center">
          <p className="text-white text-sm text-center">
            &copy; {new Date().getFullYear()} 3DP.rw All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
