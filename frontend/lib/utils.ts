import 'tailwindcss/tailwind.css'

export function getCookie(c_name: string) {
  var c_value = document.cookie,
    c_start = c_value.indexOf(' ' + c_name + '=')
  if (c_start == -1) c_start = c_value.indexOf(c_name + '=')
  if (c_start == -1) {
    c_value = ''
  } else {
    c_start = c_value.indexOf('=', c_start) + 1
    var c_end = c_value.indexOf(';', c_start)
    if (c_end == -1) {
      c_end = c_value.length
    }
    c_value = unescape(c_value.substring(c_start, c_end))
  }
  return c_value
}
