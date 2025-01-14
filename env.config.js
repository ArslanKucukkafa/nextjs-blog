// Environment Configuration
const environments = {
  development: {
    NEXT_PUBLIC_API_URL: "https://wizarddev-arslan.site",
  },
  production: {
    NEXT_PUBLIC_API_URL: "https://wizarddev-arslan.site", // Production API URL
  },
  test: {
    NEXT_PUBLIC_API_URL: "https://wizarddev-arslan.site",
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
