/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://fakestoreapi.com/",
        port: "",
      },
    ],
  },
};

export default nextConfig;
