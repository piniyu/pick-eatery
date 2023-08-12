export async function GET(request: Request) {
	const searchParams = new URL(request.url).searchParams
	const lat = searchParams.get('lat')
	const lng = searchParams.get('lng')
	const nextPageToken = searchParams.get('next_page_token')
	const type = searchParams.get('type')

	const res = await fetch(
		`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${type}&radius=1000&language=zh-TW&key=${
			process.env.MAP_API_KEY
		}${nextPageToken !== 'undefined' ? `&pagetoken=${nextPageToken}` : ''}`,
	)
	console.log(typeof nextPageToken, nextPageToken ? true : false)
	return res
}
