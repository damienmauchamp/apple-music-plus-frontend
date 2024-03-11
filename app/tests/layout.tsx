import Section from '@/src/components/Section/Section'

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Section id={'home'} title={'Home'} level={1}>
				{children}
			</Section>
		</>
	)
}
