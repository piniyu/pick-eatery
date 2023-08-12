/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'maps.googleapis.com',
				port: '',
				// pathname: '/my-bucket/**',
			},
		],
	},
	env: {
		MAP_API_KEY: 'AIzaSyCn89RAoUnOMke9gWNzldopvj35uTrqasM',
	},
}

module.exports = nextConfig
