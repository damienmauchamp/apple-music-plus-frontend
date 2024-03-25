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
	touch?: Touch
	target?: EventTarget | null
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
				touch: touch,
				target: e.target,
				preventDefault: function () {
					e.preventDefault()
				},
			} as PointerListenerEvent)
		})
}

export const _getTextPosition = (
	element: HTMLDivElement | null | undefined
) => {
	if (!element) return
	if (element.innerHTML == '') return element.getBoundingClientRect()
	const range = document.createRange()
	range.setStart(element, 0)
	range.setEnd(element, 1)
	return range.getBoundingClientRect()
}

export const _getElementRect = (
	element: HTMLDivElement,
	app: HTMLDivElement
) => {
	// console.log('_getElementRect', {
	// 	element: element,
	// 	app: app,
	// })

	const sizes = element.getBoundingClientRect()
	const rect = { left: 0, top: 0, right: 0, bottom: 0 }
	do {
		rect.left += element.offsetLeft
		rect.top += element.offsetTop
		// } while ((element = element.offsetParent) !== this.page.app)
	} while ((element = element.offsetParent) !== app)
	rect.right = rect.left + (sizes.right - rect.left)
	rect.bottom = rect.top + (sizes.bottom - rect.top)
	return rect
}
export const _relativeToApp = (rect?: DOMRect, app?: HTMLDivElement | null) => {
	// todo : forward ref pour this page ?
	// const pageRect = this.page.getBoundingClientRect()
	const pageRect = (app || document.body).getBoundingClientRect()
	return {
		left: (rect?.left || 0) - pageRect.left,
		top: (rect?.top || 0) - pageRect.top,
		right: (rect?.right || 0) - pageRect.left,
		bottom: (rect?.bottom || 0) - pageRect.top,
	}
}

export const _cloneTextStyle = (element, sourceElement) => {
	const style = getComputedStyle(sourceElement)
	element.style.color = style.color
	element.style.fontSize = style.fontSize
	element.style.fontWeight = style.fontWeight
	element.style.letterSpacing = style.letterSpacing
	element.innerHTML = sourceElement.innerHTML
}

export interface StyleTransitionStyle {
	source?: HTMLDivElement | SVGSVGElement | null
	translate: number[]
	opacity?: number | string
}

export class StyleTransition {
	scale: (p: any) => this
	width: (p: any) => this
	target: HTMLDivElement | SVGSVGElement | null | undefined
	from: any
	to: any
	height: (p: any) => this
	opacity: (p: any) => this
	fontWeight: (p: any) => this
	padding: (p: any) => this
	borderRadius: (p: any) => this
	backgroundColor: (p: any) => this
	color: (p: any) => this
	translate: (p: any) => this
	fontSize: (p: any) => this
	$fontScale: (p: any, reversed: any) => this

	constructor(
		target: HTMLDivElement | SVGSVGElement | null | undefined,
		fromStyle: StyleTransitionStyle,
		toStyle: StyleTransitionStyle
	) {
		const that = this
		this.target = target
		this.from = _computeTargetStyle(fromStyle)
		this.to = _computeTargetStyle(toStyle)

		this.scale = (p) => _applyDefFun('scale', p)
		this.width = (p) => _applyDefFun('width', p, (v) => `${v}px`)
		this.height = (p) => _applyDefFun('height', p, (v) => `${v}px`)
		this.opacity = (p) => _applyDefFun('opacity', p)
		this.fontWeight = (p) => _applyDefFun('fontWeight', p)
		this.padding = (p) =>
			_applyDefFun(
				'padding',
				p,
				(a) => `${a[0]}px ${a[1]}px ${a[2]}px ${a[3]}px`
			)
		this.borderRadius = (p) =>
			_applyDefFun(
				'borderRadius',
				p,
				(a) => `${a[0]}px ${a[1]}px ${a[2]}px ${a[3]}px`
			)
		this.backgroundColor = (p) =>
			_applyDefFun(
				'backgroundColor',
				p,
				(a) => `rgba(${a[0]},${a[1]},${a[2]},${a[3]})`
			)
		this.color = (p) =>
			_applyDefFun(
				'color',
				p,
				(a) => `rgba(${a[0]},${a[1]},${a[2]},${a[3]})`
			)
		this.translate = (p) =>
			_applyDefFun('translate', p, (a) => `${a[0]}px ${a[1]}px`)
		this.fontSize = (p) => _applyDefFun('fontSize', p)

		this.$fontScale = (p, reversed) => {
			const fontRatio = reversed
				? that.from.fontSize / that.to.fontSize
				: that.to.fontSize / that.from.fontSize
			that.target.style.scale = String(
				1 - (1 - fontRatio) * (reversed ? 1 - p : p)
			)
			return this
		}

		function _computeTargetStyle(targetStyle) {
			if (targetStyle['source'] === undefined) return targetStyle
			function set(name, value) {
				if (targetStyle[name] === undefined) targetStyle[name] = value
			}

			const style = getComputedStyle(targetStyle['source'])
			set('scale', style.scale == 'none' ? 1 : style.scale)
			set('width', _parse(style.width))
			set('height', _parse(style.height))
			set('opacity', style.opacity)
			set('fontWeight', style.fontWeight)
			set('fontSize', _parse(style.fontSize))
			set(
				'padding',
				_parse([
					style.paddingTop,
					style.paddingRight,
					style.paddingBottom,
					style.paddingLeft,
				])
			)
			set(
				'borderRadius',
				_parse([
					style.borderTopLeftRadius,
					style.borderTopRightRadius,
					style.borderBottomRightRadius,
					style.borderBottomLeftRadius,
				])
			)
			set('translate', _parse([style.translateX, style.translateY]))
			set('backgroundColor', _parseColor(style.backgroundColor))
			set('color', _parseColor(style.color))
			return targetStyle
		}

		function _parse(v) {
			return v instanceof Array ? v.map(parseFloat) : parseFloat(v)
		}

		function _parseColor(c) {
			const res = c.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
			if (res.length == 3) res.push('1')
			return res
		}

		function _defFun(propName, percent) {
			const from = that.from[propName]
			const to = that.to[propName]
			if (from == to) return from
			if (from instanceof Array)
				return from.map((el, i) => el - (el - to[i]) * percent)
			return from - (from - to) * percent
		}

		function _applyDefFun(propName, percent, callback = (a) => a) {
			that.target.style[propName] = callback(_defFun(propName, percent))
			return that
		}
	}
}
