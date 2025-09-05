/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["zoom-server-3557.onrender.com"],
  },
  output: "standalone", // Netlify/Vercel deployment এ standalone build
};

export default nextConfig;
