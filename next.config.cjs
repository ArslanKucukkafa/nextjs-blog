/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Turbopack'i devre dışı bırak
    turbo: {
      enabled: false,
    },
    proxyTimeout: 30000, // 30 saniye
    enableSourceMaps: true
  },
  reactStrictMode: true,
  // Diğer önceki ayarlarınızı koruyalım
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
  },
  
  // API Route Proxy Konfigürasyonu
  async rewrites() {
    return [
      // Tüm API çağrıları için genel bir proxy
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
      },
      // Spesifik route'lar için özel konfigürasyonlar
      {
        source: '/api/hero-text',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/hero-text`
      },
      {
        source: '/api/about',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/about`
      },
      {
        source: '/api/articles',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/articles`
      }
    ];
  },

  // CORS ve Güvenlik Ayarları
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { 
            key: 'Access-Control-Allow-Origin', 
            value: process.env.CORS_ALLOWED_ORIGINS || '*' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' 
          }
        ]
      }
    ];
  },

  // Webpack Konfigürasyonu
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };
    return config;
  },

  // Serverless Function Timeout ve Boyut Ayarları
  serverless: {
    // Serverless function timeout'unu artır (saniye cinsinden)
    timeout: 30,
    // Maximum function boyutunu artır (MB cinsinden)
    maxSize: 50 * 1024 * 1024 // 50 MB
  }
};

module.exports = nextConfig;
