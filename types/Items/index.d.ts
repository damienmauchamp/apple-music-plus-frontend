export interface Item {}
export interface Artist {
	storeId: string
	name: string
}
export interface Album {
	// identifier: string
	// id: number,
	storeId: string
	name: string
	artistName: string
	artists?: Artist[]
	releaseDate: string
	artworkUrl: string
	artworkSize: number
	contentRating: string
	// trackCount?: number
	// isSingle?: boolean
	// isCompilation?: boolean
	// isComplete?: boolean
	inLibrary?: boolean | null
	// upc?: string
	// api?: any
	// custom?: boolean
	// disabled?: boolean
	// created_at?: string
	// updated_at?: string
}
export interface Song {
	// identifier: string
	// id: number,
	storeId: string
	name: string
	albumId: string
	albumName: string
	album?: Album
	artists: Artist[]
	artistId: string
	artistName: string
	releaseDate: string
	artworkUrl: string
	artworkSize: number
	durationInMillis?: number
	contentRating: string
	// discNumber?: number
	// previewUrl?: string
	inLibrary?: boolean | null
	// api?: any
	// custom?: boolean
	// disabled?: boolean
	// created_at?: string
	// updated_at?: string
}

export interface SectionCollectionProps {
	loading?: boolean
}

export interface UserArtist {
	id?: int
	name: string
	storeId: string
	artworkUrl?: string
}
