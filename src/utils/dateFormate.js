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
export function getMonthFirstDaySecond(value) {
  return dayjs(value).startOf('month').format('YYYY-MM-DD HH:mm:ss')
}

export function getWeekBeforeDaySecond(value) {
  return dayjs(value).subtract(6, 'day').format('YYYY-MM-DD HH:mm:ss')
}

export function geYearFirstDay(value) {
  return dayjs(value).startOf('year').format('YYYY-MM-DD')
}
export function dayFormateByDot(value) {
  return dayjs(value).format('YYYY.MM.DD')
}

export function getMonthFirstDayByDot(value) {
  return dayjs(value).startOf('month').format('YYYY-MM-DD')
}

export function geYearFirstDaySecond(value) {
  return dayjs(value).startOf('year').format('YYYY-MM-DD HH:mm:ss')
}
export function getWeekBeforeDay(value) {
  return dayjs(value).subtract(6, 'day').format('YYYY-MM-DD')
}
export function getDottime(value) { // 2022-10-02 00:00:00
  var year = value.getFullYear()
  year = year < 10 ? '0' + year : year
  var month = value.getMonth() + 1
  month = month < 10 ? '0' + month : month
  var dates = value.getDate()
  dates = dates < 10 ? '0' + dates : dates
  return `${year}-${month}-${dates} 00:00:00`
}
export function getEndDottime(value) { // 2022-10-02 00:00:00
  var year = value.getFullYear()
  year = year < 10 ? '0' + year : year
  var month = value.getMonth() + 1
  month = month < 10 ? '0' + month : month
  var dates = value.getDate()
  dates = dates < 10 ? '0' + dates : dates
  return `${year}-${month}-${dates} 23:59:59`
}
