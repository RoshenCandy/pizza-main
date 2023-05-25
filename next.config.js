/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    DOMAIN_URL: process.env.DOMAIN_URL,
  },
};
