import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
