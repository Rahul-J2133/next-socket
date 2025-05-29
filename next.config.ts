/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: ['http://192.168.29.98:3000', 'http://192.168.29.76:3000'], // 👈 Add your WiFi IP and port here
  },
};

export default nextConfig;
