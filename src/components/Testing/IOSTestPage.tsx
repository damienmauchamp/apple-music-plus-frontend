'use client'

import IOSApp from './iOSApp/IOSApp'
import IOSPage from './iOSPage/iOSPage'
import IOSTab from './iOSTab/iOSTab'

interface Props {}

const IOSTestPage = (props: Props) => {
	console.log(props)
	return (
		<>
			<IOSApp>
				<IOSTab id="test" name="test" page="test/test" selected={true}>
					<IOSPage title="Test page" backTitle="Go back">
						Tableview is list with a variety of functionality, where
						you can change the text and controls.
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
					{/* <IOSPage title="Test page 2" back="Go back"></IOSPage> */}
				</IOSTab>
			</IOSApp>
		</>
	)
}

export default IOSTestPage
