import { motion } from "framer-motion";
import Link from "next/link";

const Logo = () => (
  <svg
    height="40"
    viewBox="0 0 102 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M51 0L76.5 25.5V76.5L51 102L25.5 76.5V25.5L51 0Z" fill="#F472B6" />
    <path
      d="M51 20L66.5 35.5V66.5L51 82L35.5 66.5V35.5L51 20Z"
      fill="white"
      stroke="#F472B6"
      strokeWidth="4"
    />
    <path
      d="M51 10L71.5 30.5V71.5L51 92L30.5 71.5V30.5L51 10Z"
      stroke="#F472B6"
      strokeWidth="6"
    />
  </svg>
);

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  pageTitle: string;
  panelTitle: string;
  panelSubtitle: string;
  linkHref: string;
  linkText: string;
  mobileLinkText: string;
}

const AuthLayout = ({
  children,
  pageTitle,
  panelTitle,
  panelSubtitle,
  linkHref,
  linkText,
  mobileLinkText,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 shadow-2xl rounded-lg overflow-hidden">
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-yellow-600 opacity-90"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3cpath d='M0 0 L50 0 L10 100 L0 100 Z' fill='%23FFFFFF' fill-opacity='0.1'/%3e%3cpath d='M50 0 L100 0 L60 100 L10 100 Z' fill='%23FFFFFF' fill-opacity='0.1'/%3e%3c/svg%3e")`,
            }}
          ></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">{panelTitle}</h2>
              <p className="mb-8">{panelSubtitle}</p>
              <Link href={linkHref}>
                <span className="cursor-pointer border-2 border-white rounded-full font-bold px-12 py-2 uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  {linkText}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 w-full">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-bold text-black mt-4">
              {pageTitle}
            </h2>
          </div>
          {children}
          <div className="md:hidden text-center mt-8">
            <Link href={linkHref}>
              <span className="cursor-pointer text-black font-semibold hover:underline">
                {mobileLinkText}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
