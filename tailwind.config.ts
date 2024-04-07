import type { Config } from 'tailwindcss'

/**
 * [iOS17] Colors from Apple Design Resources - iOS 17
 * https://www.figma.com/community/file/1248375255495415511
 */
export const iOSTheme = {
	color: {
		red: {
			light: '#FF3B30',
			DEFAULT: '#FF3B30',
			dark: '#FF453A',
		},
		orange: {
			light: '#FF9500',
			DEFAULT: '#FF9500',
			dark: '#FF9F0A',
		},
		yellow: {
			light: '#FFCC00',
			DEFAULT: '#FFCC00',
			dark: '#FFD60A',
		},
		green: {
			light: '#34C759',
			DEFAULT: '#34C759',
			dark: '#30D158',
		},
		mint: {
			light: '#00C7BE',
			DEFAULT: '#00C7BE',
			dark: '#63E6E2',
		},
		teal: {
			light: '#30B0C7',
			DEFAULT: '#30B0C7',
			dark: '#40CBE0',
		},
		cyan: {
			light: '#32ADE6',
			DEFAULT: '#32ADE6',
			dark: '#64D2FF',
		},
		blue: {
			light: '#007AFF',
			DEFAULT: '#007AFF',
			dark: '#0A84FF',
		},
		indigo: {
			light: '#5856D6',
			DEFAULT: '#5856D6',
			dark: '#5E5CE6',
		},
		purple: {
			light: '#AF52DE',
			DEFAULT: '#AF52DE',
			dark: '#BF5AF2',
		},
		pink: {
			light: '#FF2D55',
			DEFAULT: '#FF2D55',
			dark: '##FF375F',
		},
		brown: {
			light: '#A2845E',
			DEFAULT: '#A2845E',
			dark: '#AC8E68',
		},
		black: '#000000',
		grey: {
			light: '#8E8E93',
			DEFAULT: '#8E8E93',
			dark: '#8E8E93',
		},
		grey2: {
			light: '#AEAEB2',
			DEFAULT: '#AEAEB2',
			dark: '#636366',
		},
		grey3: {
			light: '#C7C7CC',
			DEFAULT: '#C7C7CC',
			dark: '#48484A',
		},
		grey4: {
			light: '#D1D1D6',
			DEFAULT: '#D1D1D6',
			dark: '#3A3A3C',
		},
		grey5: {
			light: '#E5E5EA',
			DEFAULT: '#E5E5EA',
			dark: '#2C2C2E',
		},
		grey6: {
			light: '#F2F2F7',
			DEFAULT: '#F2F2F7',
			dark: '#1C1C1E',
		},
		white: '#FFFFFF',
	},
}

/**
 * Theme colors
 */
// export const primaryColor = iOSTheme.color.blue
export const primaryColor = iOSTheme.color.pink
export const buttonColor = primaryColor

export const inactionColor = {
	light: '#eeeeef',
	DEFAULT: '#eeeeef',
	dark: '#1c1c1e',
}

// const safe = '1.25rem',
// 	gridGapX = '.5rem'
const safe = '1rem',
	gridGapX = '1rem'

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
				// todo : tmp
				primaryColor: primaryColor,
				buttonColor: buttonColor,
				inactionColor: inactionColor,
				//
				items: {
					primary: {
						DEFAULT: '#000',
						dark: '#fff',
					},
					secondary: {
						DEFAULT: '#8A8A8E',
						dark: '#8D8D93',
					},
				},
				links: {
					DEFAULT: '#000',
					dark: '#fff',
				},
				//
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
						letterSpacing: '0px',
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
				// '6c': 'calc(100% / 6 - 1rem - .5rem / 6)',
				// '5c': 'calc(100% / 5 - 1rem - .5rem / 5)',
				// '4c': 'calc(100% / 4 - 1rem - .5rem / 4)',
				// '3c': 'calc(100% / 3 - 1rem - .5rem / 3)',
				// '2c': 'calc(100% / 2 - 1rem - .5rem / 2)',
				// '1c': 'calc(100% - 1rem - .5rem / 1)',
				// colum-gap: 0.5rem + safe: 1.25rem
				//
				// '6c': 'calc(100% / 6 - .5rem + .5rem / 6)',
				// '5c': 'calc(100% / 5 - .5rem + .5rem / 5)',
				// '4c': 'calc(100% / 4 - .5rem + .5rem / 4)',
				// '3c': 'calc(100% / 3 - .5rem + .5rem / 3)',
				// '2c': 'calc(100% / 2 - .5rem + .5rem / 2)',
				// '2c': 'calc(100% / 2 - .5rem - .5rem / 2)',
				// '1c': 'calc(100% / 1 - .5rem + .5rem / 1)',

				// '6c': 'calc(100% / 6 - .5rem / 6 - 1.25rem / 2)',
				// '5c': 'calc(100% / 5 - .5rem / 5 - 1.25rem / 2)',
				// '4c': 'calc(100% / 4 - .5rem / 4 - 1.25rem / 2)',
				// '3c': 'calc(100% / 3 - .5rem / 3 - 1.25rem / 2)',
				// '2c': 'calc(100% / 2 - .5rem / 2 - 1.25rem / 2)',
				// '1c': 'calc(100% / 1 - .5rem / 1 - 1.25rem / 2)',
				//
				// //
				// '6c-album-full': 'calc(100% / 6 - 1rem + 1rem / 6)',
				// '5c-album-full': 'calc(100% / 5 - 1rem + 1rem / 5)',
				// '4c-album-full': 'calc(100% / 4 - 1rem + 1rem / 4)',
				// '3c-album-full': 'calc(100% / 3 - 1rem + 1rem / 3)',
				// '2c-album-full': 'calc(100% / 2 - 1rem + 1rem / 2)',
				// '1c-album-full': 'calc(100% - 1rem + 1rem)',
				//
				'6c': 'calc(100% / 6 - 1rem - .5rem / 6)',
				'5c': 'calc(100% / 5 - 1rem - .5rem / 5)',
				'4c': 'calc(100% / 4 - 1rem - .5rem / 4)',
				'3c': 'calc(100% / 3 - 1rem - .5rem / 3)',
				'2c': 'calc(100% / 2 - 1rem - .5rem / 2)',
				'1c': 'calc(100% - .5rem / 1)',
				//
				'6c-album-full': 'calc(100% / 6 - 1rem + 1rem / 6)',
				'5c-album-full': 'calc(100% / 5 - 1rem + 1rem / 5)',
				'4c-album-full': 'calc(100% / 4 - 1rem + 1rem / 4)',
				// '4c-album-full': `calc(100% / 4 - ${gridGapX} + ${gridGapX} / 4)`,
				'3c-album-full': 'calc(100% / 3 - 1rem + 1rem / 3)',
				'2c-album-full': 'calc(100% / 2 - 1rem + 1rem / 2)',
				// '2c-album-full': `calc(100% / 2 - ${gridGapX} + ${gridGapX} / 2)`,
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
			gap: {
				safe: safe,
				gridX: gridGapX,
			},
			margin: {
				safe: safe,
				gridX: gridGapX,
			},
			padding: {
				safe: safe,
				gridX: gridGapX,
			},
			spacing: {
				uiNavigation: '1.25rem', // px-5
			},
		},
	},
	plugins: [],
}
export default config
