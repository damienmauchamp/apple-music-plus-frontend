export default class MusicProvider {
	static configured: boolean = false
	static instance: any
	static sharedProvider() {
		if (!MusicProvider.instance) {
			MusicProvider.instance = new MusicProvider()
		}
		return MusicProvider.instance
	}

	async configure(force: boolean = false) {
		if (MusicProvider.configured && !force) {
			return
		}

		const configuration: MusicKit.Configuration = {
			// TODO : fetch /api/developer_token + storefront ?
			developerToken: process.env.DEVELOPER_TOKEN,
			app: {
				name: process.env.APP_NAME,
				build: process.env.APP_BUILD,
			},
			// storefrontId: '143442'// process.env.APP_STOREFRONT
			// storefrontId: 'fr'// process.env.APP_STOREFRONT
		}

		if (Number(process.env.MUSICKIT_VERSION) === 3) {
			await window.MusicKit.configure(configuration)
		} else {
			window.MusicKit.configure(configuration)
		}
		MusicProvider.configured = true
	}

	getMusicInstance(): MusicKit.MusicKitInstance {
		return window.MusicKit.getInstance()
	}

	static get() {
		const musicProvider = MusicProvider.sharedProvider()
		musicProvider.configure()

		const instance = musicProvider.getMusicInstance()
		return instance
	}
}
