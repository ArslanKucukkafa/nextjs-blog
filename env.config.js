// Environment Configuration
const environments = {
  development: {
    NEXT_PUBLIC_API_URL: "http://141.148.230.97:8080",
  },
  production: {
    NEXT_PUBLIC_API_URL: "http://141.148.230.97:8080",
  },
  test: {
    NEXT_PUBLIC_API_URL: "http://localhost:8080",
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
