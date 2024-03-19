'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error('tests.error.tsx', error)
	}, [error])

	return (
		<div>
			<div className="flex flex-col justify-center items-center w-full bg-red p-8">
				<h2 className="text-2xl">Error.tsx</h2>
				<h2>Something went wrong!</h2>
				<p>{error.message}</p>
				<button onClick={() => reset()}>Try again</button>
			</div>
		</div>
	)
}
