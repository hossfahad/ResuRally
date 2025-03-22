/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript during production builds
    ignoreBuildErrors: true,
  },
  // Configure API routes to proxy to Manifest backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? `${process.env.MANIFEST_URL || 'https://your-manifest-url.com'}/api/:path*`
          : 'http://localhost:1111/api/:path*',
      },
      {
        source: '/admin/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? `${process.env.MANIFEST_URL || 'https://your-manifest-url.com'}/admin/:path*` 
          : 'http://localhost:1111/:path*',
      }
    ];
  },
  // Add environment variables to be available at build time
  env: {
    MANIFEST_URL: process.env.MANIFEST_URL,
  }
};

module.exports = nextConfig; 