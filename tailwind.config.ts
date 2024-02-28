import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
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
				'5c': 'calc(100% / 5 - 1rem)',
				'4c': 'calc(100% / 4 - 1rem)',
				'3c': 'calc(100% / 3 - 1rem)',
				'2c': 'calc(100% / 2 - 1rem)',
				'1c': 'calc(100% - 1rem)',
				'6c-album-full': 'calc(100% / 6 - 1rem + 1rem / 6)',
				'5c-album-full': 'calc(100% / 5 - 1rem + 1rem / 5)',
				'4c-album-full': 'calc(100% / 4 - 1rem + 1rem / 4)',
				'3c-album-full': 'calc(100% / 3 - 1rem + 1rem / 3)',
				'2c-album-full': 'calc(100% / 2 - 1rem + 1rem / 2)',
				'1c-album-full': 'calc(100% - 1rem + 1rem)',
				'6c-song-full': 'calc(100% / 6 - 1rem / 12)',
				'5c-song-full': 'calc(100% / 5 - 1rem / 10)',
				'4c-song-full': 'calc(100% / 4 - 1rem / 8)',
				'3c-song-full': 'calc(100% / 3 - 1rem / 6)',
				'2c-song-full': 'calc(100% / 2 - 1rem / 4)',
				'1c-song-full': 'calc(100% - 1rem / 2)',
			},
		},
	},
	plugins: [],
}
export default config
