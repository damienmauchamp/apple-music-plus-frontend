export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className="bg-gray-600 py-4 min-h-[1500px]">
				<div>LAYOUT</div>

				<div>{children}</div>
			</div>
		</>
	)
}
