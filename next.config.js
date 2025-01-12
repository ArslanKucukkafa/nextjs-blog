/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Turbopack'i devre dışı bırak
    turbo: {
      enabled: false,
    },
  },
  // Diğer önceki ayarlarınızı koruyalım
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  // Explicitly load environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
