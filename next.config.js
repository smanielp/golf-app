/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/golf-app',
  assetPrefix: '/golf-app/',
}

module.exports = nextConfig