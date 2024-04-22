import React, {
	ForwardedRef,
	MutableRefObject,
	forwardRef,
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

		return (
			<>
				<Page
					className={`page-${name} !bg-white dark:!bg-black ${navbarCollapsed ? 'page-with-navbar-large-collapsed' : ''} `}
					ptr={ref ? ptr : false}
					onPtrRefresh={onPullToRefresh}
					{...props}
					ref={pageRef}
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
