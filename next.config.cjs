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
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
  // API isteklerini proxy'le
  async rewrites() {
    return [
      {
        source: '/api/hero-text',
        destination: 'http://141.148.230.97:8080/hero-text',
      },
    ];
  },

  // CORS ve güvenlik başlıkları
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
