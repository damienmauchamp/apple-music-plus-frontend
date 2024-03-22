let ignoreTimeStamp = 0

// export const mirrorEvents = (source, target, eventNames) => {
// 	eventNames.forEach((eventName) => {
// 		source.addEventListener(eventName, (e) =>
// 			target.dispatchEvent(new e.constructor(e.type, e))
// 		)
// 	})
// }

export interface PointerListenerEvent {
	clientX: number
	clientY: number
	pointerId: number
	preventDefault: () => void
}

export const addPointerListener = (
	element: HTMLDivElement | undefined,
	type: string,
	callback: {
		(e: PointerListenerEvent): void
		(arg0: PointerListenerEvent): void
	}
) => {
	// type NameType = (Window | HTMLDivElement | undefined | string)[]
	type NameType = [
		Window | HTMLElement | undefined,
		string,
		Window | HTMLElement | undefined,
		string,
	]
	let names: NameType
	if (type == 'up') names = [element, 'mouseup', element, 'touchend']
	else if (type == 'move') names = [window, 'mousemove', element, 'touchmove']
	else if (type == 'down')
		names = [element, 'mousedown', element, 'touchstart']
	else return

	names[0] &&
		names[0].addEventListener(names[1], (e) => {
			if (e.timeStamp != ignoreTimeStamp) {
				const event = e as MouseEvent
				callback({
					clientX: event.clientX,
					clientY: event.clientY,
					pointerId: 0,
					preventDefault: function () {
						e.preventDefault()
					},
				})
			}
		})
	names[2] &&
		names[2].addEventListener(names[3], (e) => {
			ignoreTimeStamp = e.timeStamp
			const event = e as TouchEvent
			const touch = event.changedTouches[0]
			callback({
				clientX: touch.clientX,
				clientY: touch.clientY,
				pointerId: touch.identifier,
				preventDefault: function () {
					e.preventDefault()
				},
			} as PointerListenerEvent)
		})
}
