/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
