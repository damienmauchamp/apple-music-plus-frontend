import React, { ReactNode } from 'react'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'

export interface iOSPageLinkProps {
	back?: boolean
	nextPage?: any
	children?: ReactNode
}

const IOSPageLink = ({
	children,
	back = false,
	nextPage,
}: iOSPageLinkProps) => {
	const { openPage } = useIOSTabContext()
	const { getCurrentPageTitleBarRefs } = useIOSAppContext()

	const nextPageHandler = () => {
		if (back) {
			// going back
			if (getCurrentPageTitleBarRefs().backContainerElementRef?.current) {
				getCurrentPageTitleBarRefs().backContainerElementRef?.current?.dispatchEvent(
					new MouseEvent('mouseup')
				)
			}
			// goBack()
			// goToPreviousPage()

			return
		}

		openPage(nextPage)
	}

	return (
		<button data-nextpage={nextPage} onClick={() => nextPageHandler()}>
			{children}
		</button>
	)
}

export default IOSPageLink
