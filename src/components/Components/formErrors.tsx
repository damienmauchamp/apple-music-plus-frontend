import React from 'react'

interface FormErrorsProps extends React.HTMLAttributes<HTMLDivElement> {
	errors?: string[]
}

const FormErrors = ({ errors = [], ...props }: FormErrorsProps) => {
	return (
		<>
			{errors.length > 0 && (
				<div {...props}>
					<div className="font-medium text-red-600">
						Whoops! Something went wrong.
					</div>

					<ul className="mt-3 list-disc list-inside text-sm text-red-600">
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}

export default FormErrors
