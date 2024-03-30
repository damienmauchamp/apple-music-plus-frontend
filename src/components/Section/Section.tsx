import React from 'react'
import styles from './Section.module.css'
// import { Item } from '@/types/Items'
import { IoChevronForward } from 'react-icons/io5'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id: string
	title?: string
	// items?: Item[]
	level?: number
	seeAll?: () => void
	seeAllPath?: string
	children?: React.ReactNode
}

const Section = ({
	children,
	title = '',
	level,
	seeAll,
	seeAllPath,
	...props
}: SectionProps) => {
	level = level || 2
	const SectionTitle = `h${level}` as keyof JSX.IntrinsicElements

	const renderTitle = () => {
		const chevron = (
			<div className={styles.chevron}>
				<IoChevronForward size={24} />
			</div>
		)

		if (!title) return null

		if (seeAll) {
			return (
				<button onClick={seeAll}>
					{title} {chevron}
				</button>
			)
		}

		if (seeAllPath) {
			return (
				<a href={seeAllPath}>
					{title} {chevron}
				</a>
			)
		}

		return title
	}

	return (
		<>
			<section className={styles.section} data-section={title} {...props}>
				<div className={styles.sectionContent}>
					<div className={styles.sectionHeader}>
						<SectionTitle className={styles.sectionTitle}>
							{renderTitle()}
						</SectionTitle>
					</div>
					<div className={styles.sectionItems}>{children}</div>
				</div>
			</section>
		</>
	)
}

export default Section
