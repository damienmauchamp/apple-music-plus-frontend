import React from 'react'
import NewReleasesGridPage from '../User/NewReleasesGridPage'
import F7Page from '../../PagesType/F7Page'

const F7NewReleasesGridPage = () => {
	const f7Ref = React.useRef<{ el: HTMLElement | null }>(null)
	return (
		<F7Page
			ref={f7Ref}
			name="releases"
			title="New Releases"
			backLink={'New Releases'}
			ptr
		>
			<NewReleasesGridPage newNav={true} />
		</F7Page>
	)
}

export default F7NewReleasesGridPage
