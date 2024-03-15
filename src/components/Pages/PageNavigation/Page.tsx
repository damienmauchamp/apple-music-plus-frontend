import Main from '@/src/components/Layout/Main'

export default function Page({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Main>{children}</Main>
		</>
	)
}
