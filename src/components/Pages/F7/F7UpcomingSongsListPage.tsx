import React from 'react'
import UpcomingSongsListPage from '../User/UpcomingSongsListPage'
import F7Page from '../../PagesType/F7Page'

const F7UpcomingSongsListPage = () => {
	return (
		<F7Page
			name="upcoming-songs"
			title={'Upcoming Songs'}
			backLink={'New Releases'}
		>
			<UpcomingSongsListPage newNav={true} />
		</F7Page>
	)
}

export default F7UpcomingSongsListPage
