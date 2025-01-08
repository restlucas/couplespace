import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "github.com",
      "randomuser.me",
      "media.licdn.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

export default nextConfig;
