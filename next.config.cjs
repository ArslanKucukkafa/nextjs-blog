/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Turbopack'i devre dışı bırak
    turbo: {
      enabled: false,
    },
  },
  reactStrictMode: true,
  // Diğer önceki ayarlarınızı koruyalım
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // API isteklerini proxy'le
  async rewrites() {
    return [
      {
        source: '/api/hero-text',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/hero-text`,
      },
      // Diğer API yönlendirmeleri buraya eklenebilir
      {
        source: "/api/about",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/about`,
      },
      {
        source: "/api/articles",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/articles`,
      },
    ];
  },

  // CORS ve güvenlik ayarları
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { 
            key: "Access-Control-Allow-Origin", 
            value: process.env.CORS_ALLOWED_ORIGINS || "*" 
          },
          { 
            key: "Access-Control-Allow-Methods", 
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" 
          },
          { 
            key: "Access-Control-Allow-Headers", 
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" 
          },
        ],
      },
    ];
  },

  // Webpack ve diğer konfigürasyonlar
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
