"use client";

import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import AuthLayout from "../components/AuthLayout";
import { useState } from "react";

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const signupPromise = fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    }).then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Could not create account.');
      }
      return res.json();
    });

    toast.promise(signupPromise, {
      loading: "Creating account...",
      success: "Account created successfully!",
      error: (err) => err.toString(),
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
            placeholder="Company Name"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative mb-6">
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-gray-800"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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