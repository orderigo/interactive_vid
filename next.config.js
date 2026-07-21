/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  assetPrefix: './',
  images: {
    domains: ['upload.wikimedia.org', 'images.unsplash.com'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
