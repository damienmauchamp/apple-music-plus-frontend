import UISearchBar from '@/src/components/Components/UISearchBar/UISearchBar'
import React from 'react'

interface Props {}

const page = (props: Props) => {
	console.log('props', props)
	return (
		<>
			<div>
				<div>nav</div>
				<div className="gap-8 bg-gray-500">
					<UISearchBar />
				</div>
				<div className="min-h-[1800px] bg-gray-200"></div>
			</div>
		</>
	)
}

export default page
