
import NewReleasesGridPage from '@/src/components/Pages/F7/F7NewReleasesGridPage'
import UpcomingReleasesGridPage from '@/src/components/Pages/F7/F7UpcomingReleasesGridPage'
import NewSinglesGridPage from '@/src/components/Pages/F7/F7NewSinglesGridPage'
import NewSongsListPage from '@/src/components/Pages/F7/F7NewSongsListPage'
import UpcomingSongsListPage from '@/src/components/Pages/F7/F7UpcomingSongsListPage'

const routes = [
	{
		path: '/new-releases',
		component: NewReleasesGridPage,
	},
	{
		path: '/new-singles',
		component: NewSinglesGridPage,
	},
	{
		path: '/upcoming-releases',
		component: UpcomingReleasesGridPage,
	},
	{
		path: '/new-songs',
		component: NewSongsListPage,
	},
	{
		path: '/upcoming-songs',
		component: UpcomingSongsListPage,
	},
]

export default routes