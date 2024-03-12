'use client'
import useAuth from '@/lib/useAuth'
import RegisterForm from '@/src/components/Pages/Register/RegisterForm'

export default function Register() {
	const { isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <>Loading...</>
	}

	return (
		<>
			<h1>Register</h1>

			<RegisterForm />
		</>
	)
}
