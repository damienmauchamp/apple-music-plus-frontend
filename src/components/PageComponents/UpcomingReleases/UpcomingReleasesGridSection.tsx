import React from 'react'
import { Song } from '@/types/Items'
import UpcomingReleasesSection, {
	UpcomingReleasesSectionProps,
} from './UpcomingReleasesSection'

export interface UpcomingReleasesGridSectionProps
	extends UpcomingReleasesSectionProps {}

const UpcomingReleasesGridSection = ({
	data = [] as Song[],
}: UpcomingReleasesGridSectionProps) => (
	<UpcomingReleasesSection data={data} grid />
)

export default UpcomingReleasesGridSection
