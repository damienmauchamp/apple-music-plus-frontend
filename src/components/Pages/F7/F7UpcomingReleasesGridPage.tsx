import React from 'react'
import UpcomingReleasesGridPage from '../User/UpcomingReleasesGridPage'
import F7Page from '../../PagesType/F7Page'

const F7UpcomingReleasesGridPage = () => {
	return (
		<F7Page name="upcoming" title={'Upcoming'} backLink={'New Releases'}>
			<UpcomingReleasesGridPage newNav={true} />
		</F7Page>
	)
}

export default F7UpcomingReleasesGridPage
