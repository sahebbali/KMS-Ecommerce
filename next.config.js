/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXTAUTH_SECRET: 'fastsell',
	},
	images: {
		unoptimized: true,
		domains: ['source.unsplash.com', 'cdn.pixabay.com', 'images.pexel.com'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	},
};

module.exports = nextConfig;
