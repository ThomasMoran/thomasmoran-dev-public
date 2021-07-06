const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getCookieValue = name => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''

const setCookie = (name, value, expiryDays = 30) => {
  var date = new Date()
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000)
  const expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export { getCookieValue, setCookie, sleep }
