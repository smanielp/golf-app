/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/golf-app',
  images: {
    unoptimized: true
  },
  assetPrefix: '/golf-app'
}

module.exports = nextConfig