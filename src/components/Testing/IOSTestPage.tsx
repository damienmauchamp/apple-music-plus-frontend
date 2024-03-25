'use client'

// import { useState } from 'react'
import IOSApp from './iOSApp/IOSApp'
import IOSPage, { IOSPageProps } from './iOSPage/iOSPage'
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

	const page1Path = 'tab1/page1'

	const page2Path = `${page1Path}/subpage1`
	const page3Path = `${page1Path}/subpage2`

	const childPages = [
		{
			page: `${page2Path}/z1`,
			title: 'Z-1',
			children: <>{"Hey !!! I'm on page Z-1!"}</>,
		},
		{
			page: `${page2Path}/z2`,
			title: 'Z-2',
			children: <>{"Hey !!! I'm on page Z-2!"}</>,
		},
	]
	const page1 = (): IOSPageProps => ({
		id: page1Path,
		title: 'Page 1',
		page: page1Path,
		children: (
			<>
				PAGE 1 - Lorem ipsum dolor sit amet, consectetur adipiscing
				elit.
				<IOSPageLink nextPage={page2Path}>
					Go to page 2 {page2Path}
				</IOSPageLink>
				<div>
					<hr />
					{childPages &&
						childPages.map((page1page) => (
							<IOSPageLink
								key={page1page.page}
								nextPage={page1page.page}
							>
								{`- Go to 1st page's subpage : ${page1page.page}`}
							</IOSPageLink>
						))}
				</div>
				{/* <IOSPageLink nextPage={page2Path}>
					Go to page 2 {page2Path}
				</IOSPageLink> */}
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

	const page2pages = [
		{
			page: `${page2Path}/x1`,
			title: 'X-1',
		},
		{
			page: `${page2Path}/x2`,
			title: 'X-2',
		},
	] as IOSPageProps[]
	const page2 = () => ({
		// key: page2Path,
		id: page2Path,
		title: 'SubPage 1.1',
		page: page2Path,
		// prevPage: page1Path,
		backTitle: 'Page 1',
		children: (
			<>
				<div className="flex flex-col" style={{ height: '150vh' }}>
					<IOSPageBackLink back={true}>Go back !</IOSPageBackLink>
					<IOSPageLink nextPage={page3Path}>
						Go to page 3 (subpage 1.2) {page3Path}
					</IOSPageLink>
					<div>
						<hr />
						{page2pages &&
							page2pages.map((page2page) => (
								<IOSPageLink
									key={page2page.page}
									nextPage={page2page.page}
								>
									{`- Go to 2nd page's subpage : ${page2page.page}`}
								</IOSPageLink>
							))}
					</div>
				</div>
			</>
		),
		pages: page2pages,
	})

	const page3 = () => ({
		// key: page3Path,
		id: page3Path,
		title: 'SubPage 1.2',
		page: page3Path,
		prevPage: 'tab1/page2',
		backTitle: 'SubPage 1.1',
		children: (
			<>
				<div className="flex flex-col" style={{ height: '150vh' }}>
					<IOSPageBackLink back={true}>Go back !</IOSPageBackLink>
				</div>
			</>
		),
	})

	// const [pages, setPages] = useState<IOSPageProps[]>([page1()])
	const pages = [page1(), page2(), page3()]

	return (
		<>
			<IOSApp>
				<IOSTab
					id="test"
					name="Tab 1"
					page="tab1"
					selected={true}
					pages={pages}
					titlebar="titled"
				>
					{/* {pages.map((page) => page)} */}
					<div className="flex flex-col">
						<div>TOP TAB</div>
						{childPages.map((page) => (
							<IOSPage key={page.page} {...page} />
						))}
					</div>
				</IOSTab>
				<IOSTab
					id="tab2"
					name="Tab 2"
					page="tab2"
					selected={false}
					titlebar="default"
				></IOSTab>
			</IOSApp>
		</>
	)
}

export default IOSTestPage
