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
			colors: {
				input: {
					bg: {
						// light: '#71717a',
						// DEFAULT: '#71717a',
						// dark: '#262629', // todo
						light: '#EEEEEF',
						DEFAULT: '#EEEEEF',
						dark: '#1C1C1E',
					},
					elements: {
						light: '#838387',
						DEFAULT: '#838387',
						dark: '#98989F',
					},
					// text: {
					// 	light: '#fff',
					// 	DEFAULT: '#fff',
					// 	dark: '#000',
					// },
				},
			},
			fontSize: {
				// 'text-sm': [
				// 	'0.875rem' /* 14px */,
				// 	{
				// 		lineHeight: '1.25rem' /* 20px */,
				// 	},
				// ],
				global: [
					'0.9375rem' /* 15px */,
					{
						lineHeight: '1.375rem' /* 22px */,
					},
				],
				// 'text-base': [
				// 	'1rem' /* 16px */,
				// 	{
				// 		lineHeight: '1.5rem' /* 24px */,
				// 	},
				// ],
			},
			gridAutoColumns: {
				// colum-gap: 1rem + safe: 1rem
				// '6c': 'calc(100% / 6 - 1rem)',
				// '5c': 'calc(100% / 5 - 1rem)',
				// '4c': 'calc(100% / 4 - 1rem)',
				// '3c': 'calc(100% / 3 - 1rem)',
				// '2c': 'calc(100% / 2 - 1rem)',
				// '1c': 'calc(100% - 1rem)',
				// colum-gap: 0.5rem + safe: 1.25rem
				'6c': 'calc(100% / 6 - .5rem + .5rem / 6)',
				'5c': 'calc(100% / 5 - .5rem + .5rem / 5)',
				'4c': 'calc(100% / 4 - .5rem + .5rem / 4)',
				'3c': 'calc(100% / 3 - .5rem + .5rem / 3)',
				'2c': 'calc(100% / 2 - .5rem + .5rem / 2)',
				'1c': 'calc(100% / 1 - .5rem + .5rem / 1)',
				//
				'6c-album-full': 'calc(100% / 6 - 1rem + 1rem / 6)',
				'5c-album-full': 'calc(100% / 5 - 1rem + 1rem / 5)',
				'4c-album-full': 'calc(100% / 4 - 1rem + 1rem / 4)',
				'3c-album-full': 'calc(100% / 3 - 1rem + 1rem / 3)',
				'2c-album-full': 'calc(100% / 2 - 1rem + 1rem / 2)',
				'1c-album-full': 'calc(100% - 1rem + 1rem)',
				//
				'6c-song': 'calc(100% / 6 - 1rem)',
				'5c-song': 'calc(100% / 5 - 1rem)',
				'4c-song': 'calc(100% / 4 - 1rem)',
				'3c-song': 'calc(100% / 3 - 1rem)',
				'2c-song': 'calc(100% / 2 - 1rem)',
				'1c-song': 'calc(100% - 1rem)',
				//
				'6c-song-full': 'calc(100% / 6 - (1rem * (6 - 1)) / 6)',
				'5c-song-full': 'calc(100% / 5 - (1rem * (5 - 1)) / 5)',
				'4c-song-full': 'calc(100% / 4 - (1rem * (4 - 1)) / 4)',
				'3c-song-full': 'calc(100% / 3 - (1rem * (3 - 1)) / 3)',
				'2c-song-full': 'calc(100% / 2 - (1rem * (2 - 1)) / 2)',
				'1c-song-full': 'calc(100%)',
			},
			margin: {
				safe: '1.25rem',
			},
			padding: {
				safe: '1.25rem',
			},
		},
	},
	plugins: [],
}
export default config
