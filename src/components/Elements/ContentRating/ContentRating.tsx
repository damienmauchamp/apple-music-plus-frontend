import React, { CSSProperties } from 'react'
import classes from './ContentRating.module.css'

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
	// if (!fill) fill = '#ffffffa3'

	let pathSize = 9

	const renderContent = () => {
		switch (type) {
			case 'explicit':
				pathSize = 9
				// pathSize = 288
				return (
					<path
						d="M3.9 7h1.9c.4 0 .7-.2.7-.5s-.3-.4-.7-.4H4.1V4.9h1.5c.4 0 .7-.1.7-.4 0-.3-.3-.5-.7-.5H4.1V2.9h1.7c.4 0 .7-.2.7-.5 0-.2-.3-.4-.7-.4H3.9c-.6 0-.9.3-.9.7v3.7c0 .3.3.6.9.6zM1.6 0h5.8C8.5 0 9 .5 9 1.6v5.9C9 8.5 8.5 9 7.4 9H1.6C.5 9 0 8.5 0 7.4V1.6C0 .5.5 0 1.6 0z"
						// d="M124.8 224H185.6C198.4 224 208 217.6 208 208S198.4 195.2 185.6 195.2H131.2V156.8H179.2C192 156.8 201.6 153.6 201.6 144 201.6 134.4 192 128 179.2 128H131.2V92.8H185.6C198.4 92.8 208 86.4 208 76.8 208 70.4 198.4 64 185.6 64H124.8C105.6 64 96 73.6 96 86.4V204.8C96 214.4 105.6 224 124.8 224ZM51.2 0H236.8C272 0 288 16 288 51.2V240C288 272 272 288 236.8 288H51.2C16 288 0 272 0 236.8V51.2C0 16 16 0 51.2 0Z"
					></path>
				)
			case 'clean':
				pathSize = 9
				// pathSize = 288
				return (
					<path
						d="M 3.9 7 h 1.9 c 0.4 0 0.7 -0.2 0.7 -0.5 s -0.3 -0.4 -0.7 -0.4 H 4.1 V 4.9 H 4.1 V 2.9 h 1.7 c 0.4 0 0.7 -0.2 0.7 -0.5 c 0 -0.2 -0.3 -0.4 -0.7 -0.4 H 3.9 c -0.6 0 -0.9 0.3 -0.9 0.7 v 3.7 c 0 0.3 0.3 0.6 0.9 0.6 z M 1.6 0 h 5.8 C 8.5 0 9 0.5 9 1.6 v 5.9 C 9 8.5 8.5 9 7.4 9 H 1.6 C 0.5 9 0 8.5 0 7.4 V 1.6 C 0 0.5 0.5 0 1.6 0 z"
						// d="M124.8 224H185.6C198.4 224 208 217.6 208 208S198.4 195.2 185.6 195.2H131.2V156.8H131.2V92.8H185.6C198.4 92.8 208 86.4 208 76.8 208 70.4 198.4 64 185.6 64H124.8C105.6 64 96 73.6 96 86.4V204.8C96 214.4 105.6 224 124.8 224ZM51.2 0H236.8C272 0 288 16 288 51.2V240C288 272 272 288 236.8 288H51.2C16 288 0 272 0 236.8V51.2C0 16 16 0 51.2 0Z"
					></path>
				)
			default:
				return ''
		}
	}

	return (
		<svg
			// data-icon-size={iconSize}
			style={{
				...styles,
				fill: fill,
				marginLeft: '4px',
				width: size,
				height: size,
			}}
			className={classes.contentRatingSvg}
			viewBox={`0 0 ${pathSize} ${pathSize}`}
			// viewBox={`0 0 9 9`}
			// viewBox={`0 0 288 288`}
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
