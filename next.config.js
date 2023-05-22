/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-bru2-1.xx.fbcdn.net',
        port: '',
        pathname: '',
      },
    ],
  },
}

module.exports = nextConfig
