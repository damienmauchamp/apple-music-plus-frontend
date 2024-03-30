import React from 'react'
import NewSongsListPage from '../User/NewSongsListPage'
import { Navbar, Page } from 'framework7-react'

const F7NewSongsListPage = () => {
	return (
		<>
			<Page className="page-songs">
				<Navbar
					title={'New Songs'}
					backLink={'New Releases'}
					large
					transparent
					sliding
				/>
				<NewSongsListPage newNav={true} />
			</Page>
		</>
	)
}

export default F7NewSongsListPage
