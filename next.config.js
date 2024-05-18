/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ep-damp-math-a2jdj38c-pooler.eu-central-1.aws.neon.tech/:path*', // Zastąp ten URL adresem swojego serwera
      },
    ];
  },
};

export default config;
