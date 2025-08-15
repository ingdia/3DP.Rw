// components/ResetPasswordForm.js

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // State for both password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Check for the token once on component load
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token. Please check your link.");
    }
  }, [token]);

  // Main submission logic
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Clear previous errors on a new submission attempt
    setError("");

    // --- Validation Step 1: Check if passwords match ---
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return; // Stop the submission
    }

    // --- Validation Step 2: Check for password length (optional but recommended) ---
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return; // Stop the submission
    }

    if (isLoading || !password || !confirmPassword || !!error) return;

    setIsLoading(true);

    // --- YOUR API CALL GOES HERE ---
    console.log("Resetting password with token:", token);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    // --- END OF API CALL ---

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          // --- SUCCESS MESSAGE ---
          <motion.div
            key="success"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center space-y-6"
          >
            <FaCheckCircle className="mx-auto text-5xl text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Password Reset!
            </h2>
            <p className="text-gray-600">
              Your password has been successfully updated.
            </p>
            <Link
              href="/login"
              className="inline-block w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors duration-300"
            >
              Back to Login
            </Link>
          </motion.div>
        ) : (
          // --- CREATE NEW PASSWORD FORM ---
          <motion.div
            key="form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Create New Password
              </h2>
              <div className="space-y-4">
                {/* --- New Password Field --- */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 transition-colors duration-300"
                    required
                  />
                </div>
                {/* --- Confirm Password Field --- */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              {/* Centralized Error Display */}
              {error && (
                <p className="text-sm text-center text-red-600 font-medium">
                  {error}
                </p>
              )}

              {/* --- Buttons --- */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={
                    isLoading || !!error || !password || !confirmPassword
                  }
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
                <Link
                  href="/login"
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResetPasswordForm;
