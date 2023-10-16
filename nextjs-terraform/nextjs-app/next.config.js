const version = process.env.BUILD_VERSION;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  //   assetPrefix: `https://next-app-images.s3.eu-west-1.amazonaws.com/${version}`,// 'https://<CDN_URL>',
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
