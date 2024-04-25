import React, {
	ForwardedRef,
	MutableRefObject,
	forwardRef,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { NavTitleLarge, Navbar, Page, f7ready } from 'framework7-react'
import ProfileLink from '../Elements/ProfileLink/ProfileLink'
import ProfilePagePopup from '../Popups/ProfilePagePopup'
import { PageProps } from 'framework7-react/components/page.js'

export interface F7PageProps extends PageProps {
	name: string
	title: string
	backLink?: string
	fixed?: React.ReactNode
	children?: React.ReactNode
	home?: boolean
	// nav
	navBarLarge?: boolean
	hideTitle?: boolean
}

// const F7Page = (
// 	{
const F7Page = forwardRef<{ el: HTMLElement | null }, F7PageProps>(
	(
		{
			name = '',
			title,
			backLink,
			fixed,
			children,
			home = false,
			// nav
			navBarLarge = true,
			hideTitle = false,
			// F7
			onPtrRefresh,
			ptr = false,
			...props
		}: F7PageProps,
		ref?: ForwardedRef<{ el: HTMLElement | null }>
	) => {
		// F7
		const [ready, setReady] = useState<any>(false)
		useEffect(() => {
			// console.log(`%c[F7Page:${name}] MOUNTED`, 'color:green;')

			f7ready(() => {
				// (f7)
				setReady(true)
			})

			return () => {
				// console.log(`%c[F7Page:${name}] UNMOUNTED`, 'color:red;')
			}
		}, [])
		// console.log(`%c[F7Page:${name}] RENDER`, 'color:cyan;')

		// ref
		const pageRef = ref as MutableRefObject<{ el: HTMLElement | null }>

		// title
		const titleVisible = () =>
			!hideTitle && ready && (!home || (home && ready))

		// nav
		const [navbarCollapsed, setNavbarCollapsed] = useState(false) // !navBarLarge

		// Pull to refresh
		const onPullToRefresh = (done: () => void) => {
			if (!pageRef?.current) return done()

			document.dispatchEvent(
				new CustomEvent('page-ptr', {
					detail: { ref: pageRef.current, name: name },
				})
			)

			//
			if (onPtrRefresh) {
				onPtrRefresh(done)
			} else {
				setTimeout(() => done(), 100)
			}
		}

		// region searchbar
		const [searchBarEnabled, setSearchBarEnabled] = useState(false)

		const searchBarToggleHandler = useCallback(
			(e: Event, enabled: boolean) => {
				// if (!pageRef?.current) return

				const event = e as CustomEvent
				console.log('searchBarEnabledHandler', {
					name,
					// enabled,
					// pageRef: pageRef.current?.el,
					pageElement: event.detail.page,
					pageName: event.detail.name,
					// searchBarRef: event.detail.ref?.el,
					// e,
					// event,
				})

				console.log('new conditions', {
					// samepage: pageRef.current?.el === event.detail.page,
					samepage: name === event.detail.name,
				})

				// console.log('conditions', {
				// 	1: !event.detail,
				// 	2: !event.detail.ref.el,
				// 	3: !pageRef.current?.el?.contains(event.detail.ref.el),
				// })

				// if (
				// 	!event.detail ||
				// 	!event.detail.ref.el ||
				// 	!pageRef.current?.el?.contains(event.detail.ref.el)
				// ) {
				// 	return
				// }

				if (name !== event.detail.name) return

				console.log('searchBarToggleHandler', { enabled, event })

				setSearchBarEnabled(enabled)
			},
			[name]
		)

		const searchBarEnabledHandler = useCallback(
			(e: Event) => searchBarToggleHandler(e, true),
			[searchBarToggleHandler]
		)
		const searchBarDisabledHandler = useCallback(
			(e: Event) => searchBarToggleHandler(e, false),
			[searchBarToggleHandler]
		)

		useEffect(() => {
			console.log('setup searchbar listeners', name)
			document.addEventListener(
				'page-searchbar-enabled',
				searchBarEnabledHandler
			)
			document.addEventListener(
				'page-searchbar-disabled',
				searchBarDisabledHandler
			)
			return () => {
				document.removeEventListener(
					'page-searchbar-enabled',
					searchBarEnabledHandler
				)
				document.removeEventListener(
					'page-searchbar-disabled',
					searchBarDisabledHandler
				)
			}
		}, [name, pageRef, searchBarDisabledHandler, searchBarEnabledHandler])
		// endregion searchbar

		return (
			<>
				<Page
					className={`page-${name} !bg-white dark:!bg-black 
					${navbarCollapsed ? 'page-with-navbar-large-collapsed' : ''}
					${searchBarEnabled ? 'with-appstore-searchbar-enabled' : ''}
					`}
					ptr={ref ? ptr : false}
					onPtrRefresh={onPullToRefresh}
					{...props}
					ref={pageRef}
					name={name}
				>
					{/* todo : ProfileLink */}
					{fixed && <div slot="fixed">{fixed}</div>}
					<Navbar
						title={titleVisible() && title}
						// title={title}
						backLink={backLink}
						large={navBarLarge}
						transparent
						sliding
						outline={false}
						onNavbarCollapse={() => setNavbarCollapsed(true)}
						onNavbarExpand={() => setNavbarCollapsed(false)}
						className={
							searchBarEnabled
								? 'with-appstore-searchbar-enabled'
								: ''
						}
					>
						{titleVisible() && (
							<NavTitleLarge>
								<>
									{title}
									<ProfileLink nav popup />
								</>
							</NavTitleLarge>
						)}
					</Navbar>
					{children}
					<ProfilePagePopup />
				</Page>
			</>
		)
	}
)
F7Page.displayName = 'F7Page'

export default F7Page

export const pagePtrSectionEl = (id: string) =>
	document.querySelector(`section[data-section]#${id}`)
