/** @type {import('next').NextConfig} */
const config = require('config');

const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    docuHubApiURL: config.get('docuHubApiURL'),
    authTokenCookieName: config.get('authTokenCookieName')
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right'
  }
};

module.exports = nextConfig;
