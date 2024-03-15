/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.daumcdn.net",
        port: "",
        pathname: "/thumb/**"
      }
    ]
  }
};

export default nextConfig;
