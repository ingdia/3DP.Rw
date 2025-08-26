"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLoader, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";

const ForgotPasswordPage = () => {
  // State to manage the loading spinner on the button
  const [loading, setLoading] = useState(false);
  // State to switch between the form and the success message
  const [submitted, setSubmitted] = useState(false);
  // State to hold the user's email input
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    setLoading(true);
    const toastId = toast.loading("Sending reset link...");

    try {
      // --- ACTUAL API CALL ---
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // If the server responds with an error (e.g., 500), throw an error to be caught
      if (!response.ok) {
        throw new Error(data.message || 'An unexpected error occurred.');
      }
      
      // On success, show the server's message and switch the view
      toast.success(data.message, { id: toastId });
      setSubmitted(true);

    } catch (error) {
      // For security, even if an error occurs, we show a generic success message on the UI.
      // This prevents attackers from knowing which emails are registered.
      // The actual error is logged to the console for debugging.
      console.error("Forgot Password Error:", error);
      toast.success("If an account with that email exists, a link has been sent.", { id: toastId });
      setSubmitted(true); // Still switch the view to the success message
    } finally {
      // Ensure the loading spinner is turned off in all cases
      setLoading(false);
    }
  };

  // Animation variants for a smooth transition between the form and success message
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
            // --- The Form View ---
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
            // --- The Success Message View ---
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
                Check Your Inbox!
              </h3>
              <p className="text-black">
                If an account with that email exists, we've sent a password
                reset link to <strong className="text-gray-500">{email}</strong>.
                Please check your inbox and spam folder.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;