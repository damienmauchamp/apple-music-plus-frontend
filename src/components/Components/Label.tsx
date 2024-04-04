import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ children, className = '', ...props }: LabelProps) => {
	return (
		<label className={`${className} `} {...props}>
			{children}
		</label>
	)
}

export default Label
