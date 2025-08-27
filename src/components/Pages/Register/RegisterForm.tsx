import { RegisterFunction } from '@/lib/useAuth'
import FormErrors from '@/src/components/Components/FormErrors'
import Input from '@/src/components/Components/Input'
import Label from '@/src/components/Components/Label'
import Head from 'next/head'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import Link from '../../Components/Link'

interface RegisterFormProps {
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void
	register: RegisterFunction
}

const RegisterForm = ({ onSubmit, register, ...props }: RegisterFormProps) => {
	// const { register } = useAuth({ middleware: 'guest' })

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	// const [password_confirmation, setPasswordConfirmation] = useState('')
	const [errors, setErrors] = useState<string[]>([])

	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		register({ name, email, password, setErrors })

		return onSubmit && onSubmit(event)
	}

	return (
		<>
			<Head>
				<title>ergodnc — Register</title>
			</Head>

			<div className="w-3/4">
				<FormErrors className="mb-5" errors={errors} />

				<form
					onSubmit={submitForm}
					autoComplete="off"
					{...props}
					className="flex flex-col gap-4"
				>
					<div>
						<Label htmlFor="email">Name</Label>

						<Input
							ref={nameRef}
							// speechToText={true} // todo : del
							// onTranscript={(val: string) => {
							// 	console.log('onTranscript.name:', val)
							// 	// setName(val)
							// }} // todo : del
							id="name"
							type="text"
							value={name}
							// onChange={(event: ChangeEvent<HTMLInputElement>) =>
							// 	setName(event.target.value)
							// }
							onChange={(
								event: ChangeEvent<HTMLInputElement>
							) => {
								setName(event.target.value)
								console.log('onChange', event.target.value)
							}}
							required
							autoFocus
							autoComplete="off"
							placeholder="Your name"
							leftIcon={IoSearch}
						/>
					</div>

					<div>
						<Label htmlFor="email">Email</Label>

						<Input
							ref={emailRef}
							id="email"
							type="email"
							value={email}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
							placeholder="Email"
							required
							leftIcon={IoSearch}
						/>
					</div>

					<div>
						<Label htmlFor="password">Password</Label>

						<Input
							ref={passwordRef}
							id="password"
							type="password"
							value={password}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
							placeholder="Password"
							required
						/>
					</div>

					{/* <div>
						<Label htmlFor="password">Confirm Password</Label>

						<Input
							id="password_confirmation"
							type="password"
							value={password_confirmation}
							onChange={(event) =>
								console.log('onChange', event.target.value, );
								setPasswordConfirmation(event.target.value)
							}
							required
						/>
					</div> */}

					<div className="flex items-center gap-4 justify-between">
						<Link href="/login">Already registered?</Link>
					</div>
				</form>
			</div>
		</>
	)
}

export default RegisterForm
