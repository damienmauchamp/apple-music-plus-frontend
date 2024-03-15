'use client'
import useAPI from '@/lib/useAPI'
import Page from '@/src/components/Pages/PageNavigation/Page'
// import { MusicKitContextProvider } from '@/src/context/MusicKitContext'
import { useState } from 'react'

export default function Home() {
	const api = useAPI()

	const [artists, setArtists] = useState<any[]>([])

	const getUserArtists = async () => {
		const response = await api.getUserArtists()
		setArtists(response.data)
	}

	return (
		<Page>
			<main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
				Hello Home
				<a href="/tests">/tests</a>
				<a href="/login">/login</a>
				<a href="/register">/register</a>
				<button
					onClick={() => {
						api.get('/api/user')
							.then((res) => console.log(res.data))
							.catch((err) => console.error(err))
					}}
				>
					/user
				</button>
				{/* <a href="#" className="text-gray-700 hover:text-purple-700" onClick={logout}>Log Out</a> */}
				<div>
					<button onClick={getUserArtists}>/api/user/artists</button>
					<pre>{JSON.stringify(artists, null, 2)}</pre>
				</div>
			</main>
		</Page>
	)
}

// export async function getStaticProps() {
// 	return {
// 		props: {},
// 	}
// }
