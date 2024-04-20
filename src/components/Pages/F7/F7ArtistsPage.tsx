import React from 'react'
// import ArtistsPage from '../User/ArtistsPage'
import F7Page from '../../PagesType/F7Page'
import ArtistsPage from '../User/ArtistsPage'

const F7ArtistsPage = () => {
	return (
		<F7Page name="artists" title="Artists" backLink={''}>
			<ArtistsPage />
		</F7Page>
	)
}

export default F7ArtistsPage
