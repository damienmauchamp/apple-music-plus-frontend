import React from 'react'
import styles from './Section.module.css'
import Image from 'next/image'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	title: string
	items?: any[]
	seeAll?: () => void
	children?: React.ReactNode
}

const Section = ({ children, items, title, ...props }: SectionProps) => {
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
