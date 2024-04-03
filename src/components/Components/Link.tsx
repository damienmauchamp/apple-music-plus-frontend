import React from 'react'

// export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {}
export interface LinkProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {}

const Link = ({ className = '', ...props }: LinkProps) => {
	return <a className={`external ${className}`} {...props} />
}

export default Link
