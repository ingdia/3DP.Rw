"use client";

import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";

const SignUpPage = () => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve("Success!"), 1500)
    );
    toast.promise(promise, {
      loading: "Creating account...",
      success: "Account created successfully!",
      error: "Could not create account.",
    });
  };

  return (
    <AuthLayout
      pageTitle="SIGN UP"
      panelTitle="Your Welcome"
      panelSubtitle=""
      linkHref="/login"
      linkText="Login"
      mobileLinkText="Already have an account? Login"
      
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className="relative mb-4">
          <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            required
          />
        </div>
        <div className="relative mb-4">
          <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            required
          />
        </div>
        <div className="relative mb-6">
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-gray-500 text-white font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Create Account
        </button>
      </motion.form>
    </AuthLayout>
  );
};

export default SignUpPage;
