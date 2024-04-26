// Type definitions for MusicKit JS 1.2.3
// Project: https://developer.apple.com/documentation/musickitjs
// Definitions by: Waseem Dahman <https://github.com/wsmd>

declare namespace MusicKitV3 {
	interface APIV3 extends MusicKit.API {
		storefrontId: string
		music(id: string, parameters?: QueryParameters): Promise
	}
	interface MusicKitInstanceV3 extends MusicKit.MusicKitInstance {
		readonly api: APIV3
	}
}
