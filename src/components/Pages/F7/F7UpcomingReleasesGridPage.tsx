import React from 'react'
import UpcomingReleasesGridPage from '../User/UpcomingReleasesGridPage'
import { Navbar, Page } from 'framework7-react'

const F7UpcomingReleasesGridPage = () => {
	return (
		<>
			<Page className="page-releases">
				<Navbar
					title={'Upcoming'}
					backLink={'New Releases'}
					large
					transparent
					sliding
				/>
				<UpcomingReleasesGridPage newNav={true} />
			</Page>
		</>
	)
}

export default F7UpcomingReleasesGridPage
