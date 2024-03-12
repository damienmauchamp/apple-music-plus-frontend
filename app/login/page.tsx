'use client'
// import Head from 'next/head'
// import Link from 'next/link'
import Label from '@/src/components/Components/label'
import Input from '@/src/components/Components/input'
import Button from '@/src/components/Components/button'
import FormErrors from '@/src/components/Components/formErrors'
import { ChangeEvent, FormEvent, useState } from 'react'
import useAuth from '../../lib/useAuth'
// import { useSearchParams } from 'next/navigation'

export default function Login() {
	// todo : <Suspense></Suspense> when extracting to another component
	// const searchParams = useSearchParams()
	// const [email, setEmail] = useState<string>(searchParams.get('email') || '')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [remember, setRemember] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])

	const { login, isLoading, user } = useAuth({ middleware: 'guest' })

	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		login({ email, password, remember, setErrors })
	}

	if (isLoading || user) {
		return <>Loading...</>
	}

	return (
		<>
			{/* <Head>
				<title>ergodnc — Login</title>
			</Head> */}

			<div className={'w-1/2 mx-auto bg-white p-5 rounded-lg'}>
				<FormErrors className="mb-5" errors={errors} />

				<form onSubmit={(e) => submitForm(e)} autoComplete="off">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							className="block mt-1 w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
							required
							autoFocus
							autoComplete="off"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="password">Password</Label>

						<Input
							id="password"
							type="password"
							value={password}
							className="block mt-1 w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
							required
							autoComplete="current-password"
						/>
					</div>

					<div className="block mt-4">
						<label
							htmlFor="remember_me"
							className="inline-flex items-center"
						>
							<input
								id="remember_me"
								type="checkbox"
								name="remember"
								checked={remember}
								onChange={() =>
									// event: ChangeEvent<HTMLInputElement>
									setRemember(!remember)
								}
								className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
							/>

							<span className="ml-2 text-gray-600">
								Remember me
							</span>
						</label>
					</div>

					<div className="flex items-center justify-end mt-4">
						{/* <Link href="/forgot-password">
							<a className="underline text-sm text-gray-600 hover:text-gray-900">
								Forgot your password?
							</a>
						</Link> */}

						<Button className="ml-3">Login</Button>
					</div>
				</form>
			</div>
		</>
	)
}
