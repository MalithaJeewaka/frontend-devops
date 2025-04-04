import type { NextConfig } from "next";

//  this is how to add proxy to api calls
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
