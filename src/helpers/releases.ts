import moment from 'moment'

export const getFrom = () => moment().subtract(7, 'days').format('YYYY-MM-DD')
