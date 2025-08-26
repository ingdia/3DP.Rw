"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import the Next.js Link component
import AuthLayout from "../components/AuthLayout";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to handle button loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const loginPromise = fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials.');
      }
      return data;
    });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (data) => {
        // 1. Save user info and token to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        // 2. Check the user's role and redirect
        if (data.user.role === 'admin') {
          router.push('/Admin/overview'); // Redirect to admin dashboard
        } else {
          router.push('/user/dashboard'); // Redirect to user dashboard
        }
        
        return "Successfully logged in!";
      },
      error: (err) => {
        setLoading(false); // Stop loading on error
        return err.toString();
      },
    });
  };

  return (
    <AuthLayout
      pageTitle="LOGIN"
      panelTitle="New Here?"
      panelSubtitle="Create an account to get started with your data maturity assessment journey."
      linkHref="/signup"
      linkText="Sign Up"
      mobileLinkText="Don't have an account? Sign Up"
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        {/* Email Input */}
        <div className="relative mb-4">
          <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-10 border-b-2 border-gray-800 focus:outline-none focus:border-yellow-500 transition-colors"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <Link 
            href="/forgot-password" 
            className="text-sm text-gray-600 hover:text-yellow-600 hover:underline transition-colors duration-300"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-gray-500 text-white font-bold py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-600 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>

        {/* Sign Up Link Section */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="font-semibold text-yellow-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
};

export default LoginPage;