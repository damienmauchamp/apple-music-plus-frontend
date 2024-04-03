import React from 'react'
import NewReleasesGridPage from '../User/NewReleasesGridPage'
import F7Page from '../../PagesType/F7Page'

const F7NewReleasesGridPage = () => {
	return (
		<F7Page name="releases" title="New Releases" backLink={'New Releases'}>
			<NewReleasesGridPage newNav={true} />
		</F7Page>
	)
}

export default F7NewReleasesGridPage
