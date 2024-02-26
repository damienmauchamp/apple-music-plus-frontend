/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		// APP_NAME: process.env.APP_NAME,
		// APP_BUILD: process.env.APP_BUILD,
		APP_URL: process.env.APP_URL,
		DEVELOPER_TOKEN: process.env.DEVELOPER_TOKEN,
		TEST_USER_TOKEN: process.env.TEST_USER_TOKEN,
	}
};

export default nextConfig;
