import dayjs from 'dayjs'
require('dayjs/locale/zh-cn')
// import 'dayjs/locale/zh-cn' // ES 2015

dayjs.locale('zh-cn') // 全局使用

export default dayjs

export function dayFormate(value) {
  return dayjs(value).format('YYYY-MM-DD')
}
export function dayFormateDetail(value) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}
export function getMonthFirstDay(value) {
  return dayjs(value).startOf('month').format('YYYY-MM-DD')
}
export function dayFormateByDot(value) {
  return dayjs(value).format('YYYY.MM.DD')
}

export function getMonthFirstDayByDot(value) {
  return dayjs(value).startOf('month').format('YYYY-MM-DD')
}

export function geYearFirstDay(value) {
  return dayjs(value).startOf('year').format('YYYY-MM-DD')
}
export function getWeekBeforeDay(value) {
  return dayjs(value).subtract(6, 'day').format('YYYY-MM-DD')
}
