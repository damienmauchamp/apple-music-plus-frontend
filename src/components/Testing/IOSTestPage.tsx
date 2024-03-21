'use client'

// import { useState } from 'react'
import IOSApp from './iOSApp/IOSApp'
import { IOSPageProps } from './iOSPage/iOSPage'
import IOSTab from './iOSTab/iOSTab'
import IOSPageLink from './IOSPageLink/IOSPageLink'
import IOSPageBackLink from './IOSPageLink/IOSPageBackLink'

// interface Props {}

const IOSTestPage = (/*props: Props*/) => {
	// const testOpenClosePage = () => {
	// 	setPages((prevPages) =>
	// 		prevPages.length > 1
	// 			? [...prevPages.slice(0, -1)]
	// 			: [...prevPages, page2()]
	// 	)
	// }

	const page2Path = 'tab1/page1/subpage1'

	const page1 = (): IOSPageProps => ({
		// key: 'tab1/page1',
		id: 'tab1/page1',
		title: 'Page 1',
		page: 'tab1/page1',
		children: (
			<>
				PAGE 1 - Lorem ipsum dolor sit amet, consectetur adipiscing
				elit.
				<IOSPageLink nextPage={page2Path}>
					Go to page 2 {page2Path}
				</IOSPageLink>
				{/* <button onClick={testOpenPage}>Test Open (Page 1)</button> */}
				{/* <button onClick={testClosePage}>Test Close (Page 1)</button> */}
				{/* <button onClick={testOpenClosePage}>Test (Page 1)</button> */}
				Tableview is list with a variety of functionality, where you can
				change the text and controls.
				{Array(25)
					.fill('')
					.map((value, index) => {
						return (
							<div className="" key={'test' + index}>
								<p>First line</p>
								<p>Second line</p>
								<p>Third line</p>
							</div>
						)
					})}
				<div className="">
					<p>First line</p>
					<p>Second line</p>
					<p>Third line</p>
				</div>
			</>
		),
	})

	const page2 = () => ({
		// key: page2Path,
		id: page2Path,
		title: 'SubPage 1.1',
		page: page2Path,
		prevPage: 'tab1/page1',
		backTitle: 'Go back',
		children: (
			<>
				<IOSPageBackLink back={true}>Go back !</IOSPageBackLink>
			</>
		),
	})

	// const [pages, setPages] = useState<IOSPageProps[]>([page1()])
	const pages = [page1(), page2()]

	return (
		<>
			<IOSApp>
				<IOSTab
					id="test"
					name="Tab 1"
					page="tab1"
					selected={true}
					pages={pages}
				>
					{/* {pages.map((page) => page)} */}
				</IOSTab>
			</IOSApp>
		</>
	)
}

export default IOSTestPage
