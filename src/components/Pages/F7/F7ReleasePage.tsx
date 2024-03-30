import React from 'react'
import ReleasesPage from '../User/ReleasesPage'
import { Navbar, Page } from 'framework7-react'

const F7ReleasePage = () => {
	return (
		<>
			<Page className="page-home">
				<Navbar
					title={'New Releases'}
					backLink={''}
					large
					transparent
					sliding
				/>
				<ReleasesPage newNav={true} />
			</Page>
		</>
	)
}

export default F7ReleasePage
