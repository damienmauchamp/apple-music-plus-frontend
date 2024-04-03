import React from 'react'
import NewSongsListPage from '../User/NewSongsListPage'
import F7Page from '../../PagesType/F7Page'

const F7NewSongsListPage = () => {
	return (
		<F7Page name="songs" title={'New Songs'} backLink={'New Releases'}>
			<NewSongsListPage newNav={true} />
		</F7Page>
	)
}

export default F7NewSongsListPage
