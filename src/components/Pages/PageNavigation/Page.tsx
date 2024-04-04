import Main from '@/src/components/Layout/Main'

export default function Page({
	children,
	header = true,
}: {
	children: React.ReactNode
	header?: boolean
}) {
	return (
		<>
			<Main header={header}>{children}</Main>
		</>
	)
}
