'use client'

import { useEffect, useState } from 'react'
import IOSApp from './iOSApp/IOSApp'
import { IOSPageProps } from './iOSPage/iOSPage'
import IOSTab from './iOSTab/iOSTab'

// interface Props {}

const IOSTestPage = (/*props: Props*/) => {
	const testOpenClosePage = () => {
		setPages((prevPages) =>
			prevPages.length > 1
				? [...prevPages.slice(0, -1)]
				: [...prevPages, page2()]
		)
	}

	const page1 = (): IOSPageProps => ({
		// key: 'tab1/page1',
		id: 'tab1/page1',
		title: 'Page 1',
		page: 'tab1/page1',
		children: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				{/* <button onClick={testOpenPage}>Test Open (Page 1)</button> */}
				{/* <button onClick={testClosePage}>Test Close (Page 1)</button> */}
				<button onClick={testOpenClosePage}>Test (Page 1)</button>
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
		// key: 'tab1/page1/subpage1',
		id: 'tab1/page1/subpage1',
		title: 'SubPage 1.1',
		page: 'tab1/page1/subpage1',
		prevPage: 'tab1/page1',
		backTitle: 'Go back',
		children: <button onClick={testOpenClosePage}>Test (Page 2)</button>,
	})

	const [pages, setPages] = useState<IOSPageProps[]>([page1()])

	useEffect(() => {
		console.log('UE.pages', pages.length)
	}, [pages])

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
