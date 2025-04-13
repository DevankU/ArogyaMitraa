/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "0ef0-103-186-18-210.ngrok-free.app"
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },

  // ✅ This suppresses CORS warnings for ngrok in dev mode
  experimental: {
    allowedDevOrigins: ["https://0ef0-103-186-18-210.ngrok-free.app"],
  },
}

export default nextConfig;
