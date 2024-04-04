'use client'
import useAuth from '@/lib/useAuth'
import Loading from '@/src/components/Components/Loading/Loading'
import LoginForm from '@/src/components/Pages/Login/LoginForm'

export default function Login() {
	const { login, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <Loading subText="Logging page loading" />
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<LoginForm login={login} />
		</div>
	)
}
