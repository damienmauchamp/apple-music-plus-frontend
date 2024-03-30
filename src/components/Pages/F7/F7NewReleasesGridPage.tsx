import React from 'react'
import NewReleasesGridPage from '../User/NewReleasesGridPage'
import { Navbar, Page } from 'framework7-react'

const F7NewReleasesGridPage = () => {
	return (
		<>
			<Page className="page-releases">
				<Navbar
					title={'New Releases'}
					backLink={'New Releases'}
					large
					transparent
					sliding
				/>
				<NewReleasesGridPage newNav={true} />
			</Page>
		</>
	)
}

export default F7NewReleasesGridPage
