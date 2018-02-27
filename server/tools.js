class InvalidURLError extends Error {}

module.exports = {
  getParams: function (url) {
    if (!url) {
      throw new InvalidURLError('Url is not defined')
    }
    let pair
    let json = {}
    let values = url.slice(url.indexOf('?') + 1).split('&')
    for (let i = 0; i < values.length; i++) {
      pair = values[i].split('=')
      json[pair[0]] = pair[1]
    }
    return json
  },
  getRoute: function (url) {
    if (!url) {
      throw new InvalidURLError('The url is not defined')
    }
    if (url.indexOf('?') > 0) {
      return url.slice(url.indexOf('/') + 1, url.indexOf('?')).split('/')
    }
    return url.slice(url.indexOf('/') + 1).split('/')
  },
  InvalidURLError
}
