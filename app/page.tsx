'use client'
import useAPI from '@/lib/useAPI'
import { useState } from 'react'

export default function Home() {
	const api = useAPI()

	const [artists, setArtists] = useState<any[]>([])

	const getUserArtists = async () => {
		const response = await api.getUserArtists()
		setArtists(response.data)
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
			Hello Home
			<a href="/tests">/tests</a>
			<a href="/login">/login</a>
			<a href="/register">/register</a>
			{/* <a href="#" className="text-gray-700 hover:text-purple-700" onClick={logout}>Log Out</a> */}
			<div>
				<button onClick={getUserArtists}>/api/user/artists</button>
				<pre>{JSON.stringify(artists, null, 2)}</pre>
			</div>
		</main>
	)
}

// export async function getStaticProps() {
// 	return {
// 		props: {},
// 	}
// }
