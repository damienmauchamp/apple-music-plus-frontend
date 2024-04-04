import { fixNavBar } from '@/src/helpers/f7'
import { Popup, View, Page, Navbar, NavRight, Link } from 'framework7-react'
import { PopupProps } from 'framework7-react/components/popup.js'
import React, { useEffect } from 'react'

export interface PopupDOMProps extends PopupProps {
	children?: React.ReactNode
	title?: string
	className?: string
	closeTitle?: string
}

const PopupDOM = ({
	children,
	title,
	className,
	closeTitle = 'Close',
	...props
}: PopupDOMProps) => {
	useEffect(() => {
		fixNavBar()
		// document
		// 	.querySelector('.navbars.navbar-hidden')
		// 	?.classList.remove('navbar-hidden')
	}, [])

	return (
		<Popup className={className} {...props}>
			<View>
				<Page>
					<Navbar title={title} large>
						<NavRight>
							<Link popupClose>{closeTitle}</Link>
						</NavRight>
					</Navbar>
					{children}
				</Page>
			</View>
		</Popup>
	)
}

export default PopupDOM
