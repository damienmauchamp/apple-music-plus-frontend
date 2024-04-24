export const setArtworkUrl = (
	artworkUrl: string,
	artworkSize: number | string
) => artworkUrl.replace('{w}x{h}', `${artworkSize}x${artworkSize}`)

export const setArtistLink = (storeId: number | string) =>
	`https://music.apple.com/${process.env.STOREFRONT}/artist/${storeId}`

export const setAlbumLink = (storeId: number | string) =>
	`https://music.apple.com/${process.env.STOREFRONT}/album/${storeId}`

export const setAlbumSongLink = (
	albumStoreId: number | string,
	songStoreId: number | string
) => `${setAlbumLink(albumStoreId)}?i=${songStoreId}`
