import React from 'react'
import NewSinglesGridPage from '../User/NewSinglesGridPage'
import F7Page from '../../PagesType/F7Page'

const F7NewSinglesGridPage = () => {
	return (
		<F7Page
			name="singles"
			title="New Singles"
			backLink={'New Releases'}
			ptr
		>
			<NewSinglesGridPage newNav={true} />
		</F7Page>
	)
}

export default F7NewSinglesGridPage
