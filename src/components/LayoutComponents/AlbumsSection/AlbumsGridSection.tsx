import React from 'react'
import AlbumsSection, { AlbumsSectionProps } from './AlbumsSection'

export interface AlbumsGridSectionProps extends AlbumsSectionProps {}

const AlbumsGridSection = ({ ...props }: AlbumsGridSectionProps) => (
	<AlbumsSection {...props} grid />
)

export default AlbumsGridSection
