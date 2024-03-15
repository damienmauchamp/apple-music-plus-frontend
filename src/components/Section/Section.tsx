import React from 'react'
import styles from './Section.module.css'
import { Item } from '@/types/Items'
import { IoChevronForward } from 'react-icons/io5'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id: string
	title: string
	items?: Item[]
	level?: number
	seeAll?: () => void
	seeAllPath?: string
	children?: React.ReactNode
}

const Section = ({ children, title, level, ...props }: SectionProps) => {
	level = level || 2
	const SectionTitle = `h${level}` as keyof JSX.IntrinsicElements

	const renderTitle = () => {
		const chevron = (
			<div className={styles.chevron}>
				<IoChevronForward size={24} />
			</div>
		)

		if (props.seeAll) {
			return (
				<button onClick={props.seeAll}>
					{title} {chevron}
				</button>
			)
		}

		if (props.seeAllPath) {
			return (
				<a href={props.seeAllPath}>
					{title} {chevron}
				</a>
			)
		}

		return title
	}

	return (
		<>
			<section className={styles.section}>
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
