import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "car-dealer-website.s3.eu-west-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "vl.imgix.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "wdb-automart.imgix.net",
        port: "",
      },
    ],
  },
};

export default nextConfig;
