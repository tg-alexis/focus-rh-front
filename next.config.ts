import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/proxy/:path*',
  //       destination: 'https://focus-rh-api.amicale-solidarite.ovh/api/v1/:path*',
  //     },
  //   ];
  // },
	/* config options here */
	turbopack: {
		root: __dirname,
	},
	reactStrictMode: true,
	output: 'standalone',
	compiler: {
		...(process.env.NODE_ENV === 'production' && { removeConsole: true }),
	},
};

export default nextConfig;
