'use client'
import useAuth from '@/lib/useAuth'
import Loading from '@/src/components/Components/Loading/Loading'
import LoginForm from '@/src/components/Pages/Login/LoginForm'
import Page from '@/src/components/Pages/PageNavigation/Page'

export default function Login() {
	const { login, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <Loading subText="Logging page loading" />
	}

	return (
		<Page header={false}>
			<LoginForm login={login} />
		</Page>
	)
}
