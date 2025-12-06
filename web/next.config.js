/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable for static site generation - requires Sanity to be accessible for data fetching
  // output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
