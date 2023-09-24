/** @type {import('next').NextConfig} */
const config = require('config');

const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    docuHubApiURL: config.get('docuHubApiURL'),
    authTokenCookieName: config.get('authTokenCookieName'),
    api_key: config.get('api_key')
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right'
  }
};

module.exports = nextConfig;
