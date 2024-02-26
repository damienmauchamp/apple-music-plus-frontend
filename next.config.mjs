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
		// APP_NAME: process.env.APP_NAME,
		// APP_BUILD: process.env.APP_BUILD,
		APP_URL: process.env.APP_URL,
		DEVELOPER_TOKEN: process.env.DEVELOPER_TOKEN,
		STOREFRONT: process.env.STOREFRONT,
		TEST_USER_TOKEN: process.env.TEST_USER_TOKEN,
	}
};

export default nextConfig;
