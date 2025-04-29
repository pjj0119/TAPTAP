
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

module.exports = nextConfig;
