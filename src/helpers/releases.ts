import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const getFrom = (format: string = DATE_FORMAT) =>
	moment().subtract(7, 'days').format(format)
export const getFromViaWeeks = (
	weeks: number = 0,
	format: string = DATE_FORMAT
) =>
	moment()
		.add((weeks - 1) * 7, 'days')
		.format(format)
export const getToViaWeeks = (
	weeks: number = 0,
	format: string = DATE_FORMAT
) =>
	moment(getFromViaWeeks(weeks + 1))
		.subtract(1, 'days')
		.format(format)
