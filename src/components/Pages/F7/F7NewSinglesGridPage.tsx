import React from 'react'
import NewSinglesGridPage from '../User/NewSinglesGridPage'
import { Navbar, Page } from 'framework7-react'

const F7NewSinglesGridPage = () => {
	return (
		<>
			<Page className="page-singles">
				<Navbar
					title={'New Singles'}
					backLink={'New Releases'}
					large
					transparent
					sliding
				/>
				<NewSinglesGridPage newNav={true} />
			</Page>
		</>
	)
}

export default F7NewSinglesGridPage
