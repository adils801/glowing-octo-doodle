/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",        // service worker aur caching files yahan create honge
  register: true,        // auto-register service worker
  skipWaiting: true,     // updates turant activate
  disable: process.env.NODE_ENV === "development", // dev mode me disable
});

module.exports = withPWA({
  reactStrictMode: true, // agar already true hai, leave as is
});
