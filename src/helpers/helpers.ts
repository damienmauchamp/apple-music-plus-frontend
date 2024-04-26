import { AppleMusic } from '@/types/AppleMusic'
import { UserArtist } from '@/types/Items'

export const undefinedOrTrue = (value: unknown) =>
	value === undefined || value === true

export const ArtistsHelper = {
	// isArtist: (value: unknown) => typeof value === 'string',
	// isArtistArray: (value: unknown) => Array.isArray(value) && value.every(ArtistsHelper.isArtist),
	isUserArtist: (artist: { name: string }): artist is UserArtist =>
		artist && artist.name !== undefined,
	isAppleMusicArtist: (artist: {
		attributes?: object
	}): artist is AppleMusic.Artist =>
		artist && artist.attributes !== undefined,
	getStoreId: (artist: UserArtist | AppleMusic.Artist) => {
		return ArtistsHelper.isAppleMusicArtist(artist as AppleMusic.Artist)
			? (artist as AppleMusic.Artist).id
			: (artist as UserArtist).storeId
	},
	getName: (artist: UserArtist | AppleMusic.Artist) => {
		return ArtistsHelper.isAppleMusicArtist(artist as AppleMusic.Artist)
			? (artist as AppleMusic.Artist).attributes?.name
			: (artist as UserArtist).name
	},
	getArtwork: (artist: UserArtist | AppleMusic.Artist) => {
		return ArtistsHelper.isAppleMusicArtist(artist as AppleMusic.Artist)
			? (artist as AppleMusic.Artist).attributes?.artwork?.url
			: (artist as UserArtist).artworkUrl
	},
}
