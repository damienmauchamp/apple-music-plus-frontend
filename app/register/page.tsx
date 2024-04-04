'use client'
import useAuth from '@/lib/useAuth'
import Loading from '@/src/components/Components/Loading/Loading'
import Page from '@/src/components/Pages/PageNavigation/Page'
import RegisterForm from '@/src/components/Pages/Register/RegisterForm'

export default function Register() {
	const { register, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <Loading subText="Register page loading" />
	}

	return (
		<Page header={false}>
			<RegisterForm register={register} />
		</Page>
	)
}
