import React from 'react'
import UpcomingSongsListPage from '../User/UpcomingSongsListPage'
import { Navbar, Page } from 'framework7-react'

const F7UpcomingSongsListPage = () => {
	return (
		<>
			<Page className="page-releases">
				<Navbar
					title={'Upcoming Songs'}
					backLink={'New Releases'}
					large
					transparent
					sliding
				/>
				<UpcomingSongsListPage newNav={true} />
			</Page>
		</>
	)
}

export default F7UpcomingSongsListPage
