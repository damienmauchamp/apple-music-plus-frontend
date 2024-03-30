import React from 'react'
import { Song } from '@/types/Items'
import NewReleasesSection, {
	NewReleasesSectionProps,
} from './NewReleasesSection'

export interface NewReleasesGridSectionProps extends NewReleasesSectionProps {}

const NewReleasesGridSection = ({
	data = [] as Song[],
}: NewReleasesGridSectionProps) => <NewReleasesSection data={data} grid />

export default NewReleasesGridSection
