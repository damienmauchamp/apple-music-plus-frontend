import UINavigation, {
	UINavigationProps,
} from '@/src/components/Components/UINavigation/UINavigation'
import Page from '@/src/components/Pages/PageNavigation/Page'

interface PageNagivationProps extends UINavigationProps {
	children: React.ReactNode
}

export default function PageNavigation({
	children,
	...props
}: PageNagivationProps) {
	return (
		<>
			<UINavigation {...props}>
				<Page>{children}</Page>
			</UINavigation>
		</>
	)
}
