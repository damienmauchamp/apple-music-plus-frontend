'use client'
import useAuth from '@/lib/useAuth'
import Page from '@/src/components/Pages/PageNavigation/Page'
import RegisterForm from '@/src/components/Pages/Register/RegisterForm'

export default function Register() {
	const { register, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <>Loading...</>
	}

	return (
		<Page>
			<h1>Register</h1>

			<RegisterForm register={register} />
		</Page>
	)
}
