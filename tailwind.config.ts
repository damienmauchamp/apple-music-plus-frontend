import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	safelist: [
		{
			pattern: /!?grid-rows-./,
		},
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			gridAutoColumns: {
				'6c': 'calc(100% / 6 - 1rem)',
				'4c': 'calc(100% / 4 - 1rem)',
				'2c': 'calc(100% / 2 - 1rem)',
			},
		},
	},
	plugins: [],
}
export default config
