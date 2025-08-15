// pages/forgot-password.js
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLoader, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";
import AuthLayout from "../components/AuthLayout";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Sending reset link...");

    try {
      // --- REPLACE WITH YOUR ACTUAL API CALL ---
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate an error if the email is not found
      if (!email.includes("@")) {
        // Replace with actual API logic
        throw new Error("Email address not found.");
      }
      // ------------------------------------

      toast.success("Reset link sent!", { id: toastId });
      setSubmitted(true); // Switch to the success view
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : "An error occurred.";
      toast.error(errorMessage || "An error occurred.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <AuthLayout
      pageTitle="FORGOT PASSWORD"
      panelTitle="Remembered It?"
      panelSubtitle="No problem! Just head back to the login page to access your account."
      linkHref="/login"
      linkText="Login"
      mobileLinkText="Back to Login"
    >
      <div className="w-full">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
            >
              <p className="text-center text-black mb-6">
                Enter the email address associated with your account, and we'll
                send you a link to reset your password.
              </p>
              <div className="relative mb-6">
                <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center bg-gradient-to-r from-gray-600 to-yellow-500 text-white font-bold py-3 rounded-lg hover:from-gray-700 hover:to-yellow-600 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading && <FiLoader className="animate-spin mr-2" />}
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4"
              >
                <FiCheckCircle className="text-green-500 text-6xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Success!
              </h3>
              <p className="text-black">
                If an account with that email exists, we've sent a password
                reset link to <strong className="text-gray-500">{email}</strong>
                . Please check your inbox and spam folder.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
