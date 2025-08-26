// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the magic part!
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy to your backend
      },
    ];
  },
};

export default nextConfig;