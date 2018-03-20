const tools = require('../../server/tools/url')

describe('.getRoute(:url)', () => {
  describe('When url is undefined', () => {
    test('throws an exception', () => {
      const url = ''
      expect(() => {
        tools.getRoute(url)
      }).toThrow(tools.InvalidURLError)
    })
  })
  describe('When everything is fine', () => {
    test('return the route', () => {
      const url = 'www.myfakeapi.com/products'
      const route = tools.getRoute(url)
      expect(route[route.length - 1]).toBe('products')
    })
  })
})

describe('.getParams(:url)', () => {
  describe('When url is undefined', () => {
    test('throws an exception', () => {
      const url = ''
      expect(() => {
        tools.getParams(url)
      }).toThrow(tools.InvalidURLError)
    })
  })
  describe('When everything is fine', () => {
    test('return the route', () => {
      const query = 'products?name=vanilla&price=0'
      const params = tools.getParams(query)
      expect(params).toEqual({'name': 'vanilla', 'price':'0'})
    })
  })
})
