export const fixNavBar = () => {
	try {
		document
			.querySelector('.navbars.navbar-hidden')
			?.classList.remove('navbar-hidden')
	} catch (error) {}
}
