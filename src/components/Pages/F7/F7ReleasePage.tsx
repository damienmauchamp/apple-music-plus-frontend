import React from 'react'
import ReleasesPage from '../User/ReleasesPage'
import F7Page from '../../PagesType/F7Page'

export type F7ReleasePageProps = {
	home?: boolean
}

const F7ReleasePage = ({ home = false }: F7ReleasePageProps) => {
	const f7Ref = React.useRef<{ el: HTMLElement | null }>(null)
	// const onPtrRefresh = (done: () => void) => {
	// 	setTimeout(() => done(), 100)
	// }

	return (
		<F7Page
			ref={f7Ref}
			name="home"
			title="New Releases"
			backLink={''}
			home={home}
			ptr
			// onPtrRefresh={onPtrRefresh}
		>
			<ReleasesPage newNav={true} />
		</F7Page>
	)
}

export default F7ReleasePage
