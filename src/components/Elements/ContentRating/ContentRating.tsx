import React, { CSSProperties } from 'react'

export interface ContentRatingProps {
	size?: number
	iconSize?: number
	fill?: string
	styles?: CSSProperties
}
export interface ContentRatingTypeProps extends ContentRatingProps {
	type: string
}

const ContentRating = ({
	size,
	iconSize,
	fill,
	styles,
	type,
}: ContentRatingTypeProps) => {
	if (!size) size = 9
	if (!iconSize) iconSize = size
	if (!fill) fill = '#ffffffa3'

	const renderContent = () => {
		switch (type) {
			case 'explicit':
				return (
					<path d="M3.9 7h1.9c.4 0 .7-.2.7-.5s-.3-.4-.7-.4H4.1V4.9h1.5c.4 0 .7-.1.7-.4 0-.3-.3-.5-.7-.5H4.1V2.9h1.7c.4 0 .7-.2.7-.5 0-.2-.3-.4-.7-.4H3.9c-.6 0-.9.3-.9.7v3.7c0 .3.3.6.9.6zM1.6 0h5.8C8.5 0 9 .5 9 1.6v5.9C9 8.5 8.5 9 7.4 9H1.6C.5 9 0 8.5 0 7.4V1.6C0 .5.5 0 1.6 0z"></path>
				)
			case 'clean':
				return (
					<path d="M 3.9 7 h 1.9 c 0.4 0 0.7 -0.2 0.7 -0.5 s -0.3 -0.4 -0.7 -0.4 H 4.1 V 4.9 H 4.1 V 2.9 h 1.7 c 0.4 0 0.7 -0.2 0.7 -0.5 c 0 -0.2 -0.3 -0.4 -0.7 -0.4 H 3.9 c -0.6 0 -0.9 0.3 -0.9 0.7 v 3.7 c 0 0.3 0.3 0.6 0.9 0.6 z M 1.6 0 h 5.8 C 8.5 0 9 0.5 9 1.6 v 5.9 C 9 8.5 8.5 9 7.4 9 H 1.6 C 0.5 9 0 8.5 0 7.4 V 1.6 C 0 0.5 0.5 0 1.6 0 z"></path>
				)
			default:
				return ''
		}
	}

	return (
		<svg
			style={{
				...styles,
				fill: fill,
				marginLeft: '4px',
				width: size,
				height: size,
			}}
			viewBox={`0 0 ${iconSize} ${iconSize}`}
			width={iconSize}
			height={iconSize}
			aria-hidden="true"
			data-content-rating={type}
		>
			{renderContent()}
		</svg>
	)
}

export default ContentRating
