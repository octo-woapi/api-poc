class InvalidURLError extends Error {}

module.exports = {
  getParams: function (query) {
    if (!query) {
      throw new InvalidURLError('Query is not defined')
    }
    let pair
    let json = {}
    let values = query.slice(query.indexOf('?') + 1).split('&')
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
    return url.slice(url.indexOf('/') + 1).split('/')
  },
  InvalidURLError
}
