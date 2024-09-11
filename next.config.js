/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'ceneo.pl',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.ceneostatic.pl/data/products/**',
        port: '',
        pathname: '/**',
      }
    ],
    domains: ["www.ceneo.pl","image.ceneostatic.pl"],
  },
    experimental: {
      serverActions: true,
    },
    
  }