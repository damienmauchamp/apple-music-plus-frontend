import React from 'react'
import { Song } from '@/types/Items'
import NewSinglesSection, { NewSinglesSectionProps } from './NewSinglesSection'

export interface NewSinglesGridSectionProps extends NewSinglesSectionProps {}

const NewSinglesGridSection = ({
	data = [] as Song[],
	...props
}: NewSinglesGridSectionProps) => (
	<NewSinglesSection data={data} grid {...props} />
)

export default NewSinglesGridSection
