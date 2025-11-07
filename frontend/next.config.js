/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:1337/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        // Allow embedding in Strapi admin panel iframe
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:1337 https://localhost:1337",
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM http://localhost:1337',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;


