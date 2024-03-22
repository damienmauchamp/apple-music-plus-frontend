import { IOSAnimationId } from '../components/Testing/iOSApp/IOSApp'

let ignoreTimeStamp = 0

export const mirrorEvents = (source, target, eventNames) => {
	eventNames.forEach((eventName) => {
		source.addEventListener(eventName, (e) =>
			target.dispatchEvent(new e.constructor(e.type, e))
		)
	})
}

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
	let names = 0
	if (type == 'up') names = [element, 'mouseup', element, 'touchend']
	if (type == 'move') names = [window, 'mousemove', element, 'touchmove']
	if (type == 'down') names = [element, 'mousedown', element, 'touchstart']

	names[0].addEventListener(names[1], (e) => {
		if (e.timeStamp != ignoreTimeStamp)
			callback({
				clientX: e.clientX,
				clientY: e.clientY,
				pointerId: 0,
				preventDefault: function () {
					e.preventDefault()
				},
			})
	})
	names[2].addEventListener(names[3], (e) => {
		ignoreTimeStamp = e.timeStamp
		const touch = e.changedTouches[0]
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
