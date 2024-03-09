import React from 'react'
import styles from './Section.module.css'
import { Item } from '@/types/Items'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	id: string
	title: string
	items?: Item[]
	seeAll?: () => void
	children?: React.ReactNode
}

const Section = ({ children, title, ...props }: SectionProps) => {
	return (
		<>
			<section className={styles.section}>
				<div className={styles.sectionContent}>
					<div className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>{title}</h2>
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
