import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ type = 'submit', className = '', ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			className={`${className} rounded inline-flex items-center px-4 py-2 bg-purple-700 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-800 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150`}
			{...props}
		/>
	)
}

export default Button
