import React from 'react'
import styles from './Section.module.css'
import { Item } from '@/types/Items'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id: string
	title: string
	items?: Item[]
	level?: number
	seeAll?: () => void
	children?: React.ReactNode
}

const Section = ({ children, title, level, ...props }: SectionProps) => {
	level = level || 2
	const SectionTitle = `h${level}` as keyof JSX.IntrinsicElements

	return (
		<>
			<section className={styles.section}>
				<div className={styles.sectionContent}>
					<div className={styles.sectionHeader}>
						<SectionTitle className={styles.sectionTitle}>
							{title}
						</SectionTitle>
						{props.seeAll && (
							<button onClick={props.seeAll}>See all</button>
						)}
					</div>
					<div className={styles.sectionItems}>{children}</div>
				</div>
			</section>
		</>
	)
}

export default Section
