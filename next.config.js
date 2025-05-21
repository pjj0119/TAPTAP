const isExport = process.env.EXPORT_MODE === 'true';
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isExport ? '/static/front' : '',
  async rewrites() {
    return isDev
      ? [
          {
            source: '/api/loadData',
            destination: '/taptap/loadAjaxData.do',
          },
        ]
      : [];
  },
  webpack(config) {
    config.infrastructureLogging = {
      level: 'error',
    };
    return config;
  },
};

module.exports = nextConfig;
