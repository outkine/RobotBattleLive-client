import util from 'util'

export function print(...data) {
  console.log(...data)
}

export function colorStr(str, color) {
  return `\x1b[${color}m${str}\x1b[0m`
}

export function colorStrings(color, strings) {
  return strings.map(string => colorStr(string, color))
}

export function colorPrint(color, ...strings) {
  console.log(...colorStrings(color, strings))
}

const ERR_COLOR = '31'
const INFO_COLOR = '32'

export function infoPrint(...strings) {
  colorPrint(INFO_COLOR, ...strings)
}

export function errPrint(...strings) {
  console.error(...colorStrings(ERR_COLOR, strings))
}

export function pprint(data) {
  console.log(util.inspect(data, false, null, true))
}
