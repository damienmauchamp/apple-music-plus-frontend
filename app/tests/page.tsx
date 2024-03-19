import IOSTestPage from '@/src/components/Testing/IOSTestPage'

interface Props extends HTMLElement {}

const page = (props: Props) => {
	console.log('page', props)

	return (
		<>
			<IOSTestPage />
		</>
	)
}

export default page
