/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/tw-elements/dist/js/**/*.js',
	],
	theme: {
		extend: {
			colors: {
				// primary: '#44B9A7',
				primary: {
					DEFAULT: colors.blue['500'],
					...colors.blue,
				},
			},
			// backgroundImage: {
			// 	'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			// 	'gradient-conic':
			// 		'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			// },
			aspectRatio: {
				'4/3': '4 / 3',
			},
			boxShadow: {
				card: 'inset -6px -4px 15px -3px rgba(0,0,0,0.1),0px 54px 27px -37px rgba(0,0,0,0.1),13px 33px 30px -3px rgba(0,0,0,0.1)',
			},
		},
	},
	plugins: [require('tw-elements/dist/plugin.cjs')],
	darkMode: 'class',
}
