// Environment Configuration
const environments = {
  development: {
    NEXT_PUBLIC_API_URL: "http://158.178.149.38:8080", // Using Next.js proxy
  },
  production: {
    NEXT_PUBLIC_API_URL: "http://158.178.149.38:8080", // Using Next.js proxy
  },
  test: {
    NEXT_PUBLIC_API_URL: "http://158.178.149.38:8080", // Using Next.js proxy
  },
};

// Determine current environment
const env = process.env.NODE_ENV || "development";

// Export configuration
const envConfig = {
  ...environments[env],

  // Additional method to get environment-specific config
  getConfig: (key) => {
    return environments[env][key] || process.env[key];
  },
};

export default envConfig;
