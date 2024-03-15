import UISearchBar from '@/src/components/Components/UISearchBar/UISearchBar'
import React from 'react'

interface Props {}

const page = (props: Props) => {
	console.log('props', props)
	return (
		<>
			<hr />
			<hr />
			<hr />
			<div>
				<div>Page.UISearchBar : </div>
				<div className="gap-8 bg-gray-500">
					<UISearchBar />
				</div>
			</div>
		</>
	)
}

export default page
