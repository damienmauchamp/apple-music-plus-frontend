export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<section>
				<h1>Layout.tsx</h1>
				<div>{children}</div>
			</section>
		</>
	)
}
