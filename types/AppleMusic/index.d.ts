export declare namespace AppleMusic {
	interface Artwork {
		width: number
		height: number
		url: string
		bgColor: string
		textColor1: string
		textColor2: string
		textColor3: string
		textColor4: string
	}

	interface AlbumData {
		id: string
		type: string
		href: string
	}

	interface AlbumsRelationship {
		href: string
		data: AlbumData[]
	}

	interface Relationships {
		albums: AlbumsRelationship
	}
	interface Artist {
		id: string
		type: string
		href: string
		attributes: {
			name: string
			genreNames: string[]
			artwork?: Artwork
			url: string
		}
		relationships: Relationships
	}
}
