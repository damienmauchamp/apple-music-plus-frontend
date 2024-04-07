import React from 'react'
import styles from './Link.module.css'

// export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {}
export interface LinkProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {}

const Link = ({ className = '', ...props }: LinkProps) => {
	return <a className={`external ${className} ${styles.link}`} {...props} />
}

export default Link
