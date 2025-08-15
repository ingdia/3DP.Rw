import type { NextConfig } from 'next'

const config: NextConfig = {
  // This images object is the configuration for the Next.js Image Component
  images: {
    // remotePatterns is the modern, secure way to allow external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // You can add other hostnames here in the future
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.your-cms.com',
      // },
    ],
  },
}

export default config
