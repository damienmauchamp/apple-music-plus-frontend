'use client'

import { useEffect, useState } from 'react'
import IOSApp from './iOSApp/IOSApp'
import IOSPage from './iOSPage/iOSPage'
import IOSTab from './iOSTab/iOSTab'

// interface Props {}

const IOSTestPage = (/*props: Props*/) => {
	// console.log(props)

	// const testOpenPage = () => {
	// 	setPages([...pages, page2()])
	// }
	// const testClosePage = () => {
	// 	setPages(pages.slice(0, -1))
	// }

	const testOpenClosePage = () => {
		console.log('pages.length', pages.length, pages)

		if (pages.length > 1) {
			setPages(pages.slice(0, -1)) // Supprimer la dernière page
		} else {
			setPages([...pages, page2()]) // Ajouter une nouvelle page
		}
	}

	const page1 = () => {
		return (
			<IOSPage key="tab1/page1" title="Page 1" page="tab1/page1">
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
			</IOSPage>
		)
	}
	const page2 = () => (
		<IOSPage
			key="tab1/page1/subpage1"
			title="SubPage 1.1"
			page="tab1/page1/subpage1"
			prevPage="tab1/page1"
			backTitle="Go back"
		>
			{/* <button onClick={testClosePage}>Test (Page 2)</button> */}
			<button onClick={testOpenClosePage}>Test (Page 2)</button>
		</IOSPage>
	)

	const [pages, setPages] = useState<any[]>([page1()])
	useEffect(() => {
		setPages([page1()])
	}, [])

	useEffect(() => {
		console.log('UE.pages', pages.length)
		setPages(pages)
	}, [pages])

	return (
		<>
			<IOSApp>
				<IOSTab id="test" name="Tab 1" page="tab1" selected={true}>
					{pages.map((page) => page)}
					{/* */}
					{/* <IOSPage title="Test page 2" back="Go back"></IOSPage> */}
				</IOSTab>
			</IOSApp>
		</>
	)
}

export default IOSTestPage
