import type { NextConfig } from "next";
import path from "node:path";

const repoName = "Modern-Portfolio";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  basePath: isGithubPagesBuild ? `/${repoName}` : "",
  assetPrefix: isGithubPagesBuild ? `/${repoName}/` : "",
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
