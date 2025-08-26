"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLock, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Extract token from URL on component mount
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('Invalid or missing reset token.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('No token provided.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Resetting your password...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password.');
      }

      toast.success('Password reset successfully!', { id: toastId });
      setSuccess(true);

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (err: any) {
      setError(err.message);
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <FiCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Password Reset!</h2>
        <p className="text-gray-600 mt-2">You will be redirected to the login page shortly.</p>
      </div>
    );
  }

  if (!token && !error) {
      return <FiLoader className="animate-spin mx-auto text-4xl" />;
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">Reset Your Password</h2>
      <p className="text-center text-gray-600 mb-6">Enter your new password below.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="relative mb-6">
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {error && (
            <div className="flex items-center bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                <FiAlertCircle className="mr-2"/>
                <p>{error}</p>
            </div>
        )}

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full flex justify-center items-center bg-gradient-to-r from-gray-600 to-yellow-500 text-white font-bold py-3 rounded-lg hover:from-gray-700 hover:to-yellow-600 transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? <FiLoader className="animate-spin mr-2" /> : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;