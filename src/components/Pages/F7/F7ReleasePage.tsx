import React from 'react'
import ReleasesPage from '../User/ReleasesPage'
import F7Page from '../../PagesType/F7Page'

export type F7ReleasePageProps = {
	home?: boolean
}

const F7ReleasePage = ({ home = false }: F7ReleasePageProps) => {
	return (
		<F7Page name="home" title="New Releases" backLink={''} home={home}>
			<ReleasesPage newNav={true} />
		</F7Page>
	)
}

export default F7ReleasePage
