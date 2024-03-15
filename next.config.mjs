/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				// hostname: '**.mzstatic.com',
				// hostname: 'is1-ssl.mzstatic.com',
				// hostname: 'is2-ssl.mzstatic.com',
				// hostname: 'is3-ssl.mzstatic.com',
			},
		],
	},
	env: {
		// app
		// APP_NAME: process.env.APP_NAME,
		// APP_BUILD: process.env.APP_BUILD,
		APP_URL: process.env.APP_URL,
		APP_DEBUG: process.env.APP_DEBUG,
		// api
		DEVELOPER_TOKEN: process.env.DEVELOPER_TOKEN,
		STOREFRONT: process.env.STOREFRONT,
		// musicKit
		MUSICKIT_VERSION: "3",
		// tests
		// TEST_USER_TOKEN: process.env.TEST_USER_TOKEN,
		// TEST_USER_MUSIC_TOKEN: process.env.TEST_USER_MUSIC_TOKEN,
	}
};

export default nextConfig;
